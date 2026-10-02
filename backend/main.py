from typing import Literal

from fastapi import FastAPI
from pydantic import BaseModel, ConfigDict, Field

app = FastAPI()

# Temporary in-memory data: lost on every server restart.
# Section 4 moves this into Postgres.
jobs = [
    {"jobId": 1, "companyName": "Cognizant", "jobRole": "Software Dev", "jobStatus": "Applied"},
    {"jobId": 2, "companyName": "Google", "jobRole": "Software Dev", "jobStatus": "Applied"},
    {"jobId": 3, "companyName": "Apple", "jobRole": "Software Dev", "jobStatus": "Applied"},
]

JobStatus = Literal["Considering", "Applied", "Replied", "Interview", "Rejected", "Ghosted"]


class JobIn(BaseModel):
    """What a client must send to create a job."""

    model_config = ConfigDict(str_strip_whitespace=True)

    companyName: str = Field(min_length=1)
    jobRole: str = Field(min_length=1)
    jobStatus: JobStatus = "Applied"


@app.get("/jobs")
def list_jobs():
    return jobs


@app.post("/jobs", status_code=201)
def create_job(job: JobIn):
    new_job = {"jobId": len(jobs) + 1, **job.model_dump()}
    jobs.append(new_job)
    return new_job
