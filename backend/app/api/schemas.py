from typing import List, Optional, Dict
from datetime import datetime
from pydantic import BaseModel, Field

# --- Request Models ---

class JobMatchRequest(BaseModel):
    title: str
    description: str

import uuid

# --- Response Models ---

class ResumeResponse(BaseModel):
    id: uuid.UUID
    filename: str
    email: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

class MatchResult(BaseModel):
    resume_id: uuid.UUID
    filename: str
    similarity_score: float
    skills_matched: List[str] = []
    
class AnalyticsResponse(BaseModel):
    total_resumes: int
    top_skills: Dict[str, int]
