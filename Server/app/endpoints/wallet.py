from fastapi import APIRouter
from Server.app.services.solana_service import generate_wallet

router = APIRouter()

@router.get("/create_wallet", summary="Создание кошелька")
def create_wallet():
    return generate_wallet()