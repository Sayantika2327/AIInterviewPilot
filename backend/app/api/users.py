from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.core.dependencies import get_db

from app.models.user import User
from app.models.resume import Resume
from app.models.user_stats import UserStats

from app.schemas.user import UserResponse

router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


@router.get(
    "/me",
    response_model=UserResponse,
)
def get_me(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    latest_resume = (
        db.query(Resume)
        .filter(Resume.user_id == current_user.id)
        .order_by(Resume.uploaded_at.desc())
        .first()
    )

    stats = (
        db.query(UserStats)
        .filter(UserStats.user_id == current_user.id)
        .first()
    )

    return UserResponse(
        id=current_user.id,
        full_name=current_user.full_name,
        email=current_user.email,

        resume_uploaded=latest_resume is not None,

        ats_score=(
            latest_resume.ats_score
            if latest_resume and latest_resume.ats_score
            else 0
        ),

        interview_score=(
            stats.interview_score
            if stats
            else 0
        ),

        interviews_taken=(
            stats.interviews_taken
            if stats
            else 0
        ),
    )