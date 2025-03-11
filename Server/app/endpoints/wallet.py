from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from Server.app.models.send_tokens_request import SendTokenRequest
from Server.app.services.solana_service import create_and_save_wallet
from Server.app.db.session import get_db
from Server.app.services.solana_service import get_sol_balance
from Server.app.services.solana_service import send_tokens_to_address

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
    
    if isinstance(balance, dict) and "error" in balance:
        raise HTTPException(status_code=400, detail=balance["error"])
    
    return {"wallet_address": wallet_address, "balance": balance}

@router.post("/send_tokens")
def send_tokens_to_address(request: SendTokenRequest):
    response = send_tokens_to_address(request.my_private_key, request.amount, request.recipient_address)
    if "error" in response:
        raise HTTPException(status_code=400, detail=response["error"])
    return response