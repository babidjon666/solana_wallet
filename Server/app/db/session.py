# session.py
from sqlalchemy.orm import sessionmaker
from .database import engine  # Импортируем engine из database.py
from sqlalchemy.orm import Session

# Создание SessionLocal
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db() -> Session:
    db = SessionLocal()  # Создаём сессию
    try:
        yield db  # Отдаём сессию в виде генератора
    finally:
        db.close()  # Закрываем сессию после использования