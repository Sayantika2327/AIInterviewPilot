"""add ats fields to resume

Revision ID: a93e79a92ee9
Revises: 373cdc9dff99
Create Date: 2026-06-29 13:29:35.540865

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = 'a93e79a92ee9'
down_revision: Union[str, Sequence[str], None] = '373cdc9dff99'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "resumes",
        sa.Column("job_description", sa.Text(), nullable=True),
    )

    op.add_column(
        "resumes",
        sa.Column("ats_score", sa.Float(), nullable=True),
    )

    op.add_column(
        "resumes",
        sa.Column("matched_skills", sa.Text(), nullable=True),
    )

    op.add_column(
        "resumes",
        sa.Column("missing_skills", sa.Text(), nullable=True),
    )

    op.add_column(
        "resumes",
        sa.Column("suggestions", sa.Text(), nullable=True),
    )


def downgrade() -> None:
    """Downgrade schema."""

    op.drop_column("resumes", "suggestions")
    op.drop_column("resumes", "missing_skills")
    op.drop_column("resumes", "matched_skills")
    op.drop_column("resumes", "ats_score")
    op.drop_column("resumes", "job_description")