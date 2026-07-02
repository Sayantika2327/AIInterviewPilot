from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_db, get_current_user
from app.models.user import User

from app.schemas.resume import (
    ResumeAnalyzeRequest,
    ResumeAnalysisResponse,
)

from app.services.resume_ai_service import ResumeAIService
from app.services.resume_parser import ResumeParser

from app.repositories.resume_repository import ResumeRepository


router = APIRouter(
    prefix="/resume",
    tags=["Resume"],
)


@router.post(
    "/analyze",
    response_model=ResumeAnalysisResponse,
)
def analyze_resume(
    request: ResumeAnalyzeRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Analyze uploaded resume against Job Description.
    """

    resume_path = f"uploads/{current_user.id}.pdf"

    resume_text = ResumeParser.extract_text(
        resume_path
    )

    result = ResumeAIService.analyze_resume(
        resume_text=resume_text,
        job_description=request.job_description,
    )

    # Update dashboard ATS score
   

    # Get latest uploaded resume
    resume = ResumeRepository.get_latest_by_user(
        db=db,
        user_id=current_user.id,
    )

    # Save ATS analysis into resumes table
    if resume:
        ResumeRepository.save_analysis(
            db=db,
            resume=resume,
            job_description=request.job_description,
            result=result,
        )

    return result