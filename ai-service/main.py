from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pdfplumber
import io
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

BECERILER = [
    "python", "javascript", "react", "node.js", "sql", "postgresql",
    "mongodb", "docker", "git", "html", "css", "typescript", "java",
    "c++", "machine learning", "deep learning", "tensorflow", "scikit-learn",
    "fastapi", "express", "aws", "linux", "rest api", "vue", "angular"
]

def pdf_oku(dosya_icerik):
    metin = ""
    with pdfplumber.open(io.BytesIO(dosya_icerik)) as pdf:
        for sayfa in pdf.pages:
            metin += sayfa.extract_text() or ""
    return metin.lower()

def beceri_bul(metin):
    bulunan = [b for b in BECERILER if b in metin]
    return bulunan

def eslesme_hesapla(cv_metin, ilan_metin):
    if not cv_metin or not ilan_metin:
        return 0
    vektorizer = TfidfVectorizer()
    try:
        tfidf = vektorizer.fit_transform([cv_metin, ilan_metin])
        skor = cosine_similarity(tfidf[0:1], tfidf[1:2])[0][0]
        return round(float(skor) * 100, 1)
    except:
        return 0

@app.post("/api/cv/analiz")
async def cv_analiz(dosya: UploadFile = File(...)):
    icerik = await dosya.read()
    metin = pdf_oku(icerik)
    bulunan_beceriler = beceri_bul(metin)
    eksik = [b for b in BECERILER[:10] if b not in bulunan_beceriler]

    ilan_metni = "python javascript react node sql docker git"
    skor = eslesme_hesapla(metin, ilan_metni)

    return {
        "beceriler": bulunan_beceriler,
        "eksik_beceriler": eksik[:5],
        "eslesme_skoru": skor,
        "metin_uzunlugu": len(metin)
    }

@app.get("/")
def root():
    return {"message": "KariyerAI - AI Servisi çalışıyor!"}