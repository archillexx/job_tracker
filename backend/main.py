from fastapi import FastAPI

app = FastAPI()

# Temporary in-memory data: lost on every server restart.
# Section 4 moves this into Postgres.
jobs = [
    {"jobId": 1, "companyName": "Cognizant", "jobRole": "Software Dev", "jobStatus": "Applied"},
    {"jobId": 2, "companyName": "Google", "jobRole": "Software Dev", "jobStatus": "Applied"},
    {"jobId": 3, "companyName": "Apple", "jobRole": "Software Dev", "jobStatus": "Applied"},
]


@app.get("/jobs")
def list_jobs():
    return jobs
