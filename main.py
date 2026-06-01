from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pdfplumber
import io

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "KariyerAI Python servisi çalışıyor!"}

@app.post("/parse-cv")
async def parse_cv(file: UploadFile = File(...)):
    content = await file.read()
    
    with pdfplumber.open(io.BytesIO(content)) as pdf:
        text = ""
        for page in pdf.pages:
            text += page.extract_text() or ""
    
    return {
        "dosya_adi": file.filename,
        "metin": text[:1000],
        "karakter_sayisi": len(text)
    }