from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_db, get_current_user
from app.models.user import User

from app.schemas.interview import (
    InterviewStartRequest,
    InterviewStartResponse,
    InterviewAnswerRequest,
    InterviewEvaluationResponse,
    InterviewNextRequest,
)

from app.schemas.interview_report import (
    InterviewReportRequest,
    InterviewReportResponse,
)

from app.services.interview_report_service import (
    InterviewReportService,
)

from app.services.resume_parser import ResumeParser
from app.services.interview_session_service import InterviewSessionService
from app.services.interview_evaluation_service import InterviewEvaluationService
from app.services.interview_next_service import InterviewNextService

router = APIRouter(
    prefix="/interview",
    tags=["Interview"],
)


@router.post(
    "/start",
    response_model=InterviewStartResponse,
)
def start_interview(
    request: InterviewStartRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    resume_path = f"uploads/{current_user.id}.pdf"

    resume_text = ResumeParser.extract_text(
        resume_path
    )

    return InterviewSessionService.start_interview(
        db=db,
        user_id=current_user.id,
        resume_text=resume_text,
        job_description=request.job_description,
    )


@router.post(
    "/evaluate",
    response_model=InterviewEvaluationResponse,
)
def evaluate_answer(
    request: InterviewAnswerRequest,
    current_user: User = Depends(get_current_user),
):

    return InterviewEvaluationService.evaluate_answer(
        question=request.question,
        answer=request.answer,
    )


@router.post("/next")
def next_question(
    request: InterviewNextRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return InterviewNextService.next_question(
        db=db,
        interview_id=request.interview_id,
        answer=request.answer,
    )


@router.post(
    "/report",
    response_model=InterviewReportResponse,
)
def interview_report(
    request: InterviewReportRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return InterviewReportService.generate_report(
        db=db,
        interview_id=request.interview_id,
    )


# -----------------------------
# NEW ENDPOINT
# -----------------------------
@router.get(
    "/latest-report",
    response_model=InterviewReportResponse,
)
def latest_report(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return InterviewReportService.latest_report(
        db=db,
        user_id=current_user.id,
    )