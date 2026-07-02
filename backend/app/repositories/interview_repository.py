from sqlalchemy.orm import Session

from app.models.interview import Interview


class InterviewRepository:

    @staticmethod
    def create(
        db: Session,
        user_id: int,
        job_description: str,
    ):

        interview = Interview(
            user_id=user_id,
            job_description=job_description,
        )

        db.add(interview)
        db.commit()
        db.refresh(interview)

        return interview

    @staticmethod
    def get_by_id(
        db: Session,
        interview_id: int,
    ):

        return (
            db.query(Interview)
            .filter(
                Interview.id == interview_id
            )
            .first()
        )

    @staticmethod
    def update_score(
        db: Session,
        interview: Interview,
        score: int,
    ):

        interview.overall_score = score

        db.commit()
        db.refresh(interview)

        return interview

    @staticmethod
    def update_current_question(
        db: Session,
        interview: Interview,
    ):

        interview.current_question += 1

        db.commit()
        db.refresh(interview)

        return interview

    @staticmethod
    def get_latest_completed(
        db: Session,
        user_id: int,
    ):

        return (
            db.query(Interview)
            .filter(
                Interview.user_id == user_id,
                Interview.status == "completed",
            )
            .order_by(Interview.id.desc())
            .first()
        )