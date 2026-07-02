from sqlalchemy.orm import Session

from app.models.user_stats import UserStats


class UserStatsService:

    @staticmethod
    def get_or_create(
        db: Session,
        user_id: int,
    ):
        stats = (
            db.query(UserStats)
            .filter(UserStats.user_id == user_id)
            .first()
        )

        if not stats:
            stats = UserStats(user_id=user_id)
            db.add(stats)
            db.commit()
            db.refresh(stats)

        return stats

    @staticmethod
    def resume_uploaded(
        db: Session,
        user_id: int,
    ):
        stats = UserStatsService.get_or_create(
            db,
            user_id,
        )

        stats.resume_uploaded = True

        db.commit()
        db.refresh(stats)

        return stats

    @staticmethod
    def save_ats_score(
        db: Session,
        user_id: int,
        score: float,
    ):
        stats = UserStatsService.get_or_create(
            db,
            user_id,
        )

        stats.ats_score = score

        db.commit()
        db.refresh(stats)

        return stats

    @staticmethod
    def save_interview_score(
        db: Session,
        user_id: int,
        score: float,
    ):
        stats = UserStatsService.get_or_create(
            db,
            user_id,
        )

        stats.interview_score = score

        db.commit()
        db.refresh(stats)

        return stats

    @staticmethod
    def increment_interviews(
        db: Session,
        user_id: int,
    ):
        stats = UserStatsService.get_or_create(
            db,
            user_id,
        )

        stats.interviews_taken += 1

        db.commit()
        db.refresh(stats)

        return stats