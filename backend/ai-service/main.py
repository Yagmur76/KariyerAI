from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = FastAPI()

# Frontend'in (React) senin bu servisine erişebilmesi için gerekli izin ayarı (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MatchRequest(BaseModel):
    cv_text: str
    job_text: str

@app.post("/api/ai/match")
async def match_cv(request: MatchRequest):
    # TF-IDF ile eşleşme skoru hesapla
    vectorizer = TfidfVectorizer()
    matrix = vectorizer.fit_transform([request.cv_text, request.job_text])
    score = cosine_similarity(matrix[0:1], matrix[1:2])
    match_percentage = round(float(score[0][0]) * 100, 2)

    # CV'deki ve ilândaki kelimeleri bul
    cv_words = set(request.cv_text.lower().split())
    job_words = set(request.job_text.lower().split())

    # İlanda olup CV'de olmayan kelimeler = eksik beceriler
    missing = job_words - cv_words - cv_words

    # İlanda olup CV'de olmayan kelimeler = eksik beceriler
    missing = job_words - cv_words

    # Anlamsız kısa kelimeleri (Stop Words) filtrele
    stop_words = {"for", "and", "with", "the", "a", "an", "or", "in", "of", "to", "we", "at", "looking", "skills"}
    missing = missing - stop_words

    return {
        "match_score": match_percentage,
        "missing_skills": list(missing)[:5],  # En fazla 5 tane göster
        "status": "Yüksek Eşleşme" if match_percentage >= 70 else "Orta Eşleşme" if match_percentage >= 40 else "Düşük Eşleşme"
    }