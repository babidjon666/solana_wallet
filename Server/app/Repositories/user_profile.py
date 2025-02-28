from http.client import HTTPException
from Server.app.db.models import User
from sqlalchemy.orm import Session

def edit_password_repo(db: Session, user_id: int, password: str, private_key: str):
    user = db.query(User).filter(User.id == user_id and User.private_key == private_key).first()

    if user:
        user.password = password
        db.commit()
        db.refresh(user)
        return user
    raise HTTPException(status_code=404, detail="User not found") 
    