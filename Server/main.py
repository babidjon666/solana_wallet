from fastapi import FastAPI
from Server.app.endpoints import wallet
from Server.app.endpoints import account
import uvicorn

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Разрешенные источники (указываем фронтенд)
origins = [
    "http://localhost:3000",  # React-приложение
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Разрешенные домены
    allow_credentials=True,
    allow_methods=["*"],  # Разрешенные HTTP-методы
    allow_headers=["*"],  # Разрешенные заголовки
)

app.include_router(wallet.router)
app.include_router(account.router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)