# wallet.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from Server.app.services.solana_service import create_and_save_wallet
from Server.app.db.session import get_db

router = APIRouter()

@router.post("/generate_wallet/")
def generate_wallet_and_save(db: Session = Depends(get_db)):
    user = create_and_save_wallet(db=db)

    return {
        "id": user.id, 
        "wallet": user.wallet, 
        "mnemonic_phrase": None, 
        "private_key": user.private_key
        }