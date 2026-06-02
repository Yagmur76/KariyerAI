from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

import spacy

# İndirdiğimiz İngilizce dil modelini hafızaya yüklüyoruz
nlp = spacy.load("en_core_web_sm")

app = FastAPI()

# Frontend'in (React) senin bu servisine erişebilmesi için gerekli izin ayarı (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- MODEL TANIMLAMALARI ---

class MatchRequest(BaseModel):
    cv_text: str
    job_text: str

class AnalyzeRequest(BaseModel):
    cv_text: str


# --- ENDPOINT'LER ---

@app.post("/api/ai/match")
async def match_cv(request: MatchRequest):
    cv_words = set(request.cv_text.lower().split())
    job_words = set(request.job_text.lower().split())
    
    if not cv_words or not job_words:
        return {"match_score": 0, "missing_skills": [], "status": "Düşük Eşleşme"}
        
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform([request.cv_text, request.job_text])
    match_percentage = int(cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0] * 100)
    
    missing = job_words - cv_words
    stop_words = {"for", "and", "with", "the", "a", "an", "or", "in", "of", "to", "we", "at", "looking", "skills"}
    missing = missing - stop_words
    
    return {
        "match_score": match_percentage,
        "missing_skills": list(missing)[:5],
        "status": "Yüksek Eşleşme" if match_percentage >= 70 else "Orta Eşleşme" if match_percentage >= 40 else "Düşük Eşleşme"
    }


@app.post("/api/ai/analyze-cv")
async def analyze_cv(request: AnalyzeRequest):
    doc = nlp(request.cv_text.lower())
    
    skill_pool = {"python", "fastapi", "react", "sql", "docker", "javascript", "node.js", "git", "html", "css"}
    extracted_skills = []
    
    for token in doc:
        if token.text in skill_pool:
            extracted_skills.append(token.text)
            
    unique_skills = list(set(extracted_skills))
    
    return {
        "skills": unique_skills,
        "total_skills_found": len(unique_skills)
    }