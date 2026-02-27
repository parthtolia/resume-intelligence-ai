from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from app.api import routes_resume, routes_match, routes_analytics

load_dotenv()

app = FastAPI(title="Resume Intelligence AI", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # TODO: update in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(routes_resume.router, prefix="/api/resumes", tags=["Resumes"])
app.include_router(routes_match.router, prefix="/api/matching", tags=["Matching"])
app.include_router(routes_analytics.router, prefix="/api/analytics", tags=["Analytics"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Resume Intelligence AI API"}
