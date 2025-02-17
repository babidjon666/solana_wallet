from fastapi import Depends
from sqlalchemy.orm import Session
from Server.app.Repositories.user_repo import create_user
from Server.app.db.session import get_db
from solders.keypair import Keypair
from solana.rpc.api import Client
from bip_utils import Bip39MnemonicGenerator

client = Client("https://api.mainnet-beta.solana.com")

def generate_wallet():
    """Создает кошелек и возвращает публичный ключ + мнемоническую фразу"""
    keypair = Keypair()
    seed_phrase = list(keypair.secret())
    seed_bytes = bytes(seed_phrase)
    mnemonic = Bip39MnemonicGenerator().FromEntropy(seed_bytes)
    return {"public_key": str(keypair.pubkey()), "mnemonic": mnemonic}

def create_and_save_wallet(db: Session = Depends(get_db)):
    """Создает кошелек и сохраняет его в базе данных"""
    wallet_data = generate_wallet()
    public_key = wallet_data['public_key']
    # Сохраняем публичный ключ в базе данных
    return create_user(db=db, wallet=public_key)