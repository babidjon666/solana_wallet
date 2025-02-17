# database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base

SQLALCHEMY_DATABASE_URL = "postgresql://markpolakov@localhost/solanaV1"

engine = create_engine(SQLALCHEMY_DATABASE_URL)

Base = declarative_base()