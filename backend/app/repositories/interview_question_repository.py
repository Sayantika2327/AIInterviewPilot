from sqlalchemy.orm import Session

from app.models.interview_question import InterviewQuestion


class InterviewQuestionRepository:

    @staticmethod
    def create(
        db: Session,
        interview_id: int,
        question_number: int,
        question: str,
    ):

        obj = InterviewQuestion(
            interview_id=interview_id,
            question_number=question_number,
            question=question,
        )

        db.add(obj)
        db.commit()
        db.refresh(obj)

        return obj

    @staticmethod
    def get_all(
        db: Session,
        interview_id: int,
    ):

        return (
            db.query(InterviewQuestion)
            .filter(
                InterviewQuestion.interview_id == interview_id
            )
            .order_by(
                InterviewQuestion.question_number
            )
            .all()
        )

    @staticmethod
    def get_question(
        db: Session,
        interview_id: int,
        number: int,
    ):

        return (
            db.query(InterviewQuestion)
            .filter(
                InterviewQuestion.interview_id == interview_id,
                InterviewQuestion.question_number == number,
            )
            .first()
        )