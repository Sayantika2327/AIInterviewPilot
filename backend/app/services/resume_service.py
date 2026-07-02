import os
import shutil

from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.repositories.resume_repository import ResumeRepository


UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


class ResumeService:

    @staticmethod
    def upload_resume(
        db: Session,
        file: UploadFile,
        user_id: int,
    ):

        # Save every resume as user_id.pdf
        filename = f"{user_id}.pdf"

        file_path = os.path.join(
            UPLOAD_FOLDER,
            filename,
        )

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        return ResumeRepository.create(
            db=db,
            filename=filename,
            file_path=file_path,
            user_id=user_id,
        )