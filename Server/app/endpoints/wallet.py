from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from Server.app.services.solana_service import create_and_save_wallet
from Server.app.db.session import get_db
from Server.app.services.solana_service import get_sol_balance

router = APIRouter()

@router.post("/generate_wallet/")
def generate_wallet_and_save(db: Session = Depends(get_db)):
    user = create_and_save_wallet(db=db)

    return {
        "id": user.id, 
        "wallet": user.wallet, 
        "mnemonic_phrase": None, 
        "private_key": user.private_key,
        "password": user.password
        }

@router.get("/wallet/balance/{wallet_address}")
def read_wallet_balance(wallet_address: str):
    balance = get_sol_balance(wallet_address)
    
    return {"wallet_address": wallet_address, "balance": balance}