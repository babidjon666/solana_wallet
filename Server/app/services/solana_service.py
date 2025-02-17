from solders.keypair import Keypair
from solana.rpc.api import Client
from bip_utils import Bip39MnemonicGenerator

# Подключаем клиента к Solana mainnet
client = Client("https://api.mainnet-beta.solana.com")

def generate_wallet():
    """Создает кошелек и возвращает публичный ключ + мнемоническую фразу"""
    keypair = Keypair()
    seed_phrase = list(keypair.secret())
    seed_bytes = bytes(seed_phrase)
    mnemonic = Bip39MnemonicGenerator().FromEntropy(seed_bytes)
    return {"public_key": str(keypair.pubkey()), "mnemonic": mnemonic}