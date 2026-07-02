from pydantic import BaseModel


class ResumeAnalyzeRequest(BaseModel):
    job_description: str


class ResumeAnalysisResponse(BaseModel):
    matched_skills: list[str]
    missing_skills: list[str]
    ats_score: int
    suggestions: list[str]