from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user, get_db
from app.models.user import User

from app.schemas.upload import UploadResponse

from app.services.upload_service import UploadService
from app.services.user_stats_service import UserStatsService

router = APIRouter(
    prefix="/resume",
    tags=["Resume"],
)


@router.post(
    "/upload",
    response_model=UploadResponse,
)
async def upload_resume(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # Save resume
    result = await UploadService.save_resume(
    db=db,
    file=file,
    user_id=current_user.id,
)

    # Update dashboard stats
    UserStatsService.resume_uploaded(
        db=db,
        user_id=current_user.id,
    )

    return result