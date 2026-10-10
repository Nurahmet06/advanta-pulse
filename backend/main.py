from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="ADVANTA Pulse API",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500"
    ],
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE"],
    allow_headers=["Content-Type", "Authorization"]
)


@app.get("/")
def home():
    return {
        "project": "ADVANTA Pulse",
        "message": "Backend is running"
    }


@app.get("/api/health")
def health():
    return {
        "status": "ok"
    }