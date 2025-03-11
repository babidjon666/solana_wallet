from fastapi import Depends
import base58
from sqlalchemy.orm import Session
from Server.app.Repositories.user_repo import create_user
from Server.app.db.session import get_db
from solana.rpc.api import Client
from solders.transaction import VersionedTransaction as Transaction
from solders.system_program import transfer, TransferParams
from solders.keypair import Keypair
from solders.pubkey import Pubkey as PublicKey
from solders.signature import Signature
from solders.message import Message

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
        public_key = PublicKey.from_string(wallet_address)
        balance = client.get_balance(public_key)
        return balance.value / 1_000_000_000  
    except Exception as e:
        return {"error": f"Failed to get balance: {str(e)}"}

from solana.rpc.types import TxOpts
from solana.rpc.commitment import Commitment
from solders.transaction import Transaction
from solders.system_program import transfer, TransferParams
from solders.message import Message

def send_tokens_to_address(my_private_key: str, amount: float, recipient_address: str):
    try:
        # Декодируем приватный ключ
        decoded_key = base58.b58decode(my_private_key)
        
        # Проверяем корректность ключа (ожидаем 64 байта)
        if len(decoded_key) == 64:
            sender = Keypair.from_bytes(decoded_key)
        else:
            raise ValueError("Invalid private key: expected 64 bytes.")
        
        recipient = PublicKey(recipient_address)
        lamports = int(amount * 1_000_000_000)  # Конвертация SOL в лампорты

        # Получаем актуальный recent_blockhash
        latest_blockhash_resp = client.get_latest_blockhash(Commitment("finalized"))
        latest_blockhash = latest_blockhash_resp.value.blockhash

        # Формируем инструкции перевода
        transfer_instruction = transfer(TransferParams(
            from_pubkey=sender.public_key,
            to_pubkey=recipient,
            lamports=lamports
        ))

        # Создаём сообщение транзакции
        message = Message.new_with_compiled_instructions(
            num_required_signatures=1,
            num_readonly_signed_accounts=0,
            num_readonly_unsigned_accounts=1,
            account_keys=[sender.public_key, recipient],
            recent_blockhash=latest_blockhash,
            instructions=[transfer_instruction]
        )

        # Создаём транзакцию
        txn = Transaction.populate(message, [sender])

        # Отправляем транзакцию
        response = client.send_transaction(txn, opts=TxOpts(skip_confirmation=False, preflight_commitment="finalized"))

        return {"signature": response.value} 
    
    except Exception as e:
        return {"error": f"Failed to send tokens: {str(e)}"}