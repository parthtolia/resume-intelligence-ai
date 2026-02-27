from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from typing import List, Dict

from ..core.database import get_db
from ..models.resume import Resume
from .schemas import AnalyticsResponse
import json

router = APIRouter()

@router.get("/overview", response_model=AnalyticsResponse)
async def get_analytics(db: AsyncSession = Depends(get_db)):
    try:
        # Get total resumes
        total_resumes_query = await db.execute(select(func.count(Resume.id)))
        total_resumes = total_resumes_query.scalar() or 0
        
        # We need to aggregate all skills from all resumes to find the top ones
        # This could be done in SQL using jsonb but we'll do it in python for simplicity for this MVP scale
        all_resumes_query = await db.execute(select(Resume.skills))
        all_skills_rows = all_resumes_query.scalars().all()
        
        skill_counts: Dict[str, int] = {}
        for skill_list in all_skills_rows:
            if not skill_list:
                continue
            
            # SQLAlchemy might return list or JSON string depending on db dialect & driver
            if isinstance(skill_list, str):
                try:
                    skill_list = json.loads(skill_list)
                except:
                    continue
            
            for skill in skill_list:
                skill_counts[skill] = skill_counts.get(skill, 0) + 1
                
        # Sort and get top 5
        top_skills = dict(sorted(skill_counts.items(), key=lambda item: item[1], reverse=True)[:5]) # type: ignore
        
        return AnalyticsResponse(
            total_resumes=total_resumes,
            top_skills=top_skills
        )
        
    except Exception as e:
        print(f"Error fetching analytics: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch analytics.")
