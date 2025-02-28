from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from Server.app.services.password_service import edit_password
from Server.app.db.session import get_db

router = APIRouter()

@router.put("/edit_password/")
def edit_password_endpoint(user_id: int, new_password: str, private_key: str, db: Session = Depends(get_db)):
    try:
        isPasswordChanged = edit_password(db=db, user_id=user_id, new_password=new_password, private_key=private_key)
        
        if isPasswordChanged:
            return {"message": "Password changed successfully"}
        else:
            raise HTTPException(status_code=400, detail="Failed to change password")
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))