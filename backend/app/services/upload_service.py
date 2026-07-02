from datetime import datetime
from pathlib import Path
import shutil

from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.repositories.resume_repository import ResumeRepository


class UploadService:

    @staticmethod
    async def save_resume(
        db: Session,
        file: UploadFile,
        user_id: int,
    ):
        upload_dir = Path("uploads")
        upload_dir.mkdir(exist_ok=True)

        filename = f"{user_id}.pdf"

        file_path = upload_dir / filename

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Save resume in database
        ResumeRepository.create(
            db=db,
            filename=filename,
            file_path=str(file_path),
            user_id=user_id,
        )

        return {
            "filename": filename,
            "uploaded_at": datetime.utcnow(),
        }