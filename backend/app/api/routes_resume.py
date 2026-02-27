from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List

from ..core.database import get_db
from ..models.resume import Resume
from ..services.pdf_parser import extract_text_from_pdf, extract_skills
from ..services.matcher import generate_embedding
from .schemas import ResumeResponse

router = APIRouter()

@router.post("/upload", response_model=ResumeResponse, status_code=status.HTTP_201_CREATED)
async def upload_resume(
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db)
):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    
    try:
        content = await file.read()
        text = extract_text_from_pdf(content)
        
        if not text.strip():
             raise HTTPException(status_code=400, detail="Could not extract text from PDF.")
        
        # In a real app we'd use regex for email parsing
        email = None 
        skills = extract_skills(text)
        embedding = generate_embedding(text)
        
        new_resume = Resume(
            filename=file.filename,
            content=text,
            email=email,
            skills=skills,
            embedding=embedding
        )
        
        db.add(new_resume)
        await db.commit()
        await db.refresh(new_resume)
        
        return new_resume
        
    except Exception as e:
        await db.rollback()
        import traceback
        traceback.print_exc()
        print(f"Error during upload: {e}")
        raise HTTPException(status_code=500, detail="An error occurred processing the resume.")

@router.get("/resumes", response_model=List[ResumeResponse])
async def list_resumes(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Resume))
    return result.scalars().all()
