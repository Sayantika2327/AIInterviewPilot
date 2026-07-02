from sqlalchemy.orm import Session

from app.models.resume import Resume


class ResumeRepository:

    @staticmethod
    def create(
        db: Session,
        filename: str,
        file_path: str,
        user_id: int,
    ):
        resume = Resume(
            filename=filename,
            file_path=file_path,
            user_id=user_id,
        )

        db.add(resume)
        db.commit()
        db.refresh(resume)

        return resume

    @staticmethod
    def get_latest_by_user(
        db: Session,
        user_id: int,
    ):
        return (
            db.query(Resume)
            .filter(
                Resume.user_id == user_id
            )
            .order_by(
                Resume.uploaded_at.desc()
            )
            .first()
        )

    @staticmethod
    def save_analysis(
        db: Session,
        resume: Resume,
        job_description: str,
        result: dict,
    ):
        resume.job_description = job_description
        resume.ats_score = result["ats_score"]

        resume.matched_skills = ",".join(
            result["matched_skills"]
        )

        resume.missing_skills = ",".join(
            result["missing_skills"]
        )

        resume.suggestions = ",".join(
            result["suggestions"]
        )

        db.commit()
        db.refresh(resume)

        return resume

    @staticmethod
    def get_by_user(
        db: Session,
        user_id: int,
    ):
        return (
            db.query(Resume)
            .filter(
                Resume.user_id == user_id
            )
            .first()
        )