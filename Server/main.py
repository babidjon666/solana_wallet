from fastapi import FastAPI
from Server.app.endpoints import wallet

app = FastAPI(
    title="Solana API",
    description="API для работы с кошельком Solana",
    version="1.0"
)

app.include_router(wallet.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)