# 1. Bilgisayarda Python 3.11 imajını taban alıyoruz
FROM python:3.11-slim

# 2. Konteyner içinde çalışacağımız klasörü belirliyoruz
WORKDIR /app

# 3. Sistem bağımlılıklarını kuruyoruz (spaCy ve kütüphaneler için gerekli)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# 4. requirements.txt dosyasını konteyner içine kopyalıyoruz
COPY requirements.txt .

# 5. Gerekli tüm kütüphaneleri yüklüyoruz
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# 6. spaCy'nin İngilizce dil modelini konteyner içine indiriyoruz
RUN python -m spacy download en_core_web_sm

# 7. Kalan tüm yapay zeka kodlarımızı (main.py vb.) içeri kopyalıyoruz
COPY . .

# 8. Servisin dış dünyaya açılacağı portu belirtiyoruz
EXPOSE 8000

# 9. Sunucuyu ayağa kaldıracak ana komut
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]