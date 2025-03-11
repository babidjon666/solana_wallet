from pydantic import BaseModel

class SendTokenRequest(BaseModel):
    my_private_key: str
    amount: float
    recipient_address: str
