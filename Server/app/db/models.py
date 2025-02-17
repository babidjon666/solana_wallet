from Server.app.db.database import Base  
from Server.app.db.session import SessionLocal  

from sqlalchemy import Column, Integer, String

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    wallet = Column(String, index=True)
    mnemonic = Column(String)
    private_key = Column(String)