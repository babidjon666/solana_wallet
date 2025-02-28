from fastapi import Depends
from sqlalchemy.orm import Session
from Server.app.Repositories.user_repo import create_user
from Server.app.db.session import get_db
from solana.rpc.api import Client
import base58
from solders.keypair import Keypair

from solders.pubkey import Pubkey as PublicKey

client = Client("https://api.mainnet-beta.solana.com")

def generate_wallet():
    account = Keypair()
    publicKey = str(account.pubkey())
    privateKey = base58.b58encode(account.secret() + base58.b58decode(publicKey)).decode('utf-8')

    return {
        "public_key": publicKey,
        "private_key": privateKey, 
    }

def create_and_save_wallet(db: Session = Depends(get_db)):
    wallet_data = generate_wallet()
    public_key = wallet_data['public_key']
    private_key = wallet_data['private_key']

    return create_user(db=db, wallet=public_key, mnemonic=None, private_key=private_key)

def get_sol_balance(wallet_address: str):
    try:
        balance = client.get_balance(PublicKey.from_string(wallet_address))
        
        return balance.value / 1_000_000_000  
    
    except Exception as e:
        return {"error": str(e)}