from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List

from ..core.database import get_db
from ..models.resume import Resume
from ..services.matcher import generate_embedding
from .schemas import JobMatchRequest, MatchResult

router = APIRouter()

@router.post("/match", response_model=List[MatchResult])
async def match_job(
    request: JobMatchRequest,
    db: AsyncSession = Depends(get_db)
):
    try:
        combined_text = f"{request.title} {request.description}"
        job_embedding = generate_embedding(combined_text)
        
        # pgvector supports L2 distance (<->), inner product (<#>), and cosine distance (<=>)
        # We want highest cosine similarity, which means lowest cosine distance
        
        # In a real app we would perhaps apply a threshold: Resume.embedding.cosine_distance(job_embedding) < 0.5
        stmt = (
            select(Resume)
            .order_by(Resume.embedding.cosine_distance(job_embedding))
            .limit(5)
        )
        
        result = await db.execute(stmt)
        resumes = result.scalars().all()
        
        # Calculate the actual similarity score (-1 to 1) from pgvector's cosine distance (0 to 2) 
        # cosine_similarity = 1 - cosine_distance
        match_results = []
        for resume in resumes:
            # We must recalculate it here for simplicity or retrieve it via SQL func in the query.
            # Doing it locally is fine for N=5
            import numpy as np
            emb1 = np.array(job_embedding)
            emb2 = np.array(resume.embedding)
            # cosine similarity
            sim = np.dot(emb1, emb2) / (np.linalg.norm(emb1) * np.linalg.norm(emb2))
            
            match_results.append(
                MatchResult(
                    resume_id=resume.id,
                    filename=resume.filename,
                    similarity_score=float(sim),
                    skills_matched=resume.skills if resume.skills else []
                )
            )
            
        return match_results

    except Exception as e:
         print(f"Error during matching: {e}")
         raise HTTPException(status_code=500, detail="Match process failed.")
