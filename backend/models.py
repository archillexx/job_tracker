from datetime import datetime

from sqlalchemy import CheckConstraint, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column

from database import Base


class Job(Base):
    """One job application: a row in the jobs table."""

    __tablename__ = "jobs"
    # The database itself rejects any status outside the six the API allows.
    __table_args__ = (
        CheckConstraint(
            "job_status IN ('Considering', 'Applied', 'Replied', 'Interview', 'Rejected', 'Ghosted')",
            name="job_status_allowed",
        ),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    company_name: Mapped[str]
    job_role: Mapped[str]
    job_status: Mapped[str] = mapped_column(server_default="Applied")
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
