import bcrypt
from fastapi import Depends
from sqlalchemy.orm import Session
from Server.app.db.session import get_db
from Server.app.Repositories.user_profile import edit_password_repo

def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), salt)

    return hashed_password.decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:

    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))


def edit_password(db: Session, user_id: int, new_password: str, private_key: str) -> bool:
    hashed_password = hash_password(new_password)
    success = edit_password_repo(db, user_id, hashed_password, private_key)
    
    return success