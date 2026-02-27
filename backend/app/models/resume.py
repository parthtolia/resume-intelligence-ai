from sqlalchemy import Column, String, Float, DateTime, Text, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from pgvector.sqlalchemy import Vector
import uuid

from .base import Base

class Resume(Base):
    __tablename__ = "resumes"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    filename = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    email = Column(String, nullable=True)
    skills = Column(JSON, nullable=True) # Extracted skills
    embedding = Column(Vector(384)) # all-MiniLM-L6-v2 produces 384 dimensional vectors
    created_at = Column(DateTime(timezone=True), server_default=func.now())
