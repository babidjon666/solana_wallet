from Server.app.db.session import SessionLocal 
from Server.app.db.models import User
from sqlalchemy.orm import Session

def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def create_user(db: Session, wallet: str, mnemonic: str, private_key: str):
    db_user = User(wallet=wallet, mnemonic=mnemonic, private_key=private_key)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user