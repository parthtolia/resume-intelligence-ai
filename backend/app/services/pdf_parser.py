from io import BytesIO
from pypdf import PdfReader
import re

def extract_text_from_pdf(pdf_bytes: bytes) -> str:
    """Extracts text from a PDF file."""
    reader = PdfReader(BytesIO(pdf_bytes))
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    
    # Basic cleanup
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def extract_skills(text: str) -> list[str]:
    """A simplistic skill extraction - in reality this would use NER or keyword matching against a taxonomy."""
    # Dummy implementation for MVP/Example purposes.
    # We look for common tech keywords
    common_skills = [
        "python", "java", "javascript", "typescript", "react", "node.js",
        "sql", "postgresql", "fastapi", "docker", "kubernetes", "aws", "azure",
        "machine learning", "ai", "css", "html"
    ]
    
    found_skills = []
    text_lower = text.lower()
    for skill in common_skills:
        if skill in text_lower:
            found_skills.append(skill)
            
    return found_skills
