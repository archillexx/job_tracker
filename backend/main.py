from typing import Literal

from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict, Field
from sqlalchemy import select
from sqlalchemy.orm import Session

from database import SessionLocal
from models import Job

app = FastAPI()

# Let the React dev server (a different origin) read this API's responses.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

JobStatus = Literal["Considering", "Applied", "Replied", "Interview", "Rejected", "Ghosted"]


class JobIn(BaseModel):
    """What a client must send to create a job."""

    model_config = ConfigDict(str_strip_whitespace=True)

    companyName: str = Field(min_length=1)
    jobRole: str = Field(min_length=1)
    jobStatus: JobStatus = "Applied"
    jobDescription: str | None = None
    resumeText: str | None = None


def get_db():
    """Give each request its own database session, and always close it afterwards."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def job_to_api(job: Job) -> dict:
    """Turn a database row (snake_case columns) into the JSON shape React expects."""
    return {
        "jobId": job.id,
        "companyName": job.company_name,
        "jobRole": job.job_role,
        "jobStatus": job.job_status,
        "jobDescription": job.job_description,
        "resumeText": job.resume_text,
    }


@app.get("/jobs")
def list_jobs(db: Session = Depends(get_db)):
    jobs = db.scalars(select(Job).order_by(Job.id)).all()
    return [job_to_api(job) for job in jobs]


@app.post("/jobs", status_code=201)
def create_job(job_in: JobIn, db: Session = Depends(get_db)):
    job = Job(
        company_name=job_in.companyName,
        job_role=job_in.jobRole,
        job_status=job_in.jobStatus,
        # A blank box arrives as "" after stripping; store it as NULL ("not pasted").
        job_description=job_in.jobDescription or None,
        resume_text=job_in.resumeText or None,
    )
    db.add(job)
    db.commit()
    db.refresh(job)
    return job_to_api(job)
