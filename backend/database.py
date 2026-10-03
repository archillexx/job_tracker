import os

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

# Read backend/.env into environment variables (skipped if the file is missing).
load_dotenv()

# Fail loudly at startup if the address is missing, rather than on the first request.
DATABASE_URL = os.environ["DATABASE_URL"]

# One engine for the whole app: it keeps a pool of open connections to Postgres.
engine = create_engine(DATABASE_URL)

# Makes sessions on demand; routes get one session per request in task 4.5.
SessionLocal = sessionmaker(bind=engine)


class Base(DeclarativeBase):
    """Parent class of every table model; Alembic reads the tables from it."""
