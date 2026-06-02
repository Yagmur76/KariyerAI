import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './CVUpload.module.css'

function CVUpload() {
  const navigate = useNavigate()
  const [dosya, setDosya] = useState(null)
  const [yukleniyor, setYukleniyor] = useState(false)
  const [yuklendi, setYuklendi] = useState(false)

  const handleDosyaSec = (e) => {
    const secilen = e.target.files[0]
    if (secilen && secilen.type === 'application/pdf') {
      setDosya(secilen)
    } else {
      alert('Sadece PDF dosyası yükleyebilirsiniz!')
    }
  }

  const handleYukle = async () => {
    if (!dosya) return
    setYukleniyor(true)

    try {
      const formData = new FormData()
      formData.append('file', dosya)

      const response = await axios.post('http://localhost:8000/parse-cv', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      console.log('CV metni:', response.data.metin)
      setYukleniyor(false)
      setYuklendi(true)
    } catch (err) {
      setYukleniyor(false)
      alert('CV yüklenirken hata oluştu!')
    }
  }

  const formatBoyut = (bytes) => {
    return (bytes / 1024).toFixed(1) + ' KB'
  }

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <span className={styles.logo}>KariyerAI</span>
        <button
          onClick={() => navigate('/dashboard')}
          style={{background:'none', border:'none', cursor:'pointer', color:'#4f46e5', fontWeight:'500'}}
        >
          ← Dashboard
        </button>
      </nav>

      <div className={styles.content}>
        <h1 className={styles.title}>CV Yükle</h1>
        <p className={styles.subtitle}>PDF formatında CV'nizi yükleyin, AI analiz etsin.</p>

        {!yuklendi ? (
          <div className={styles.uploadCard}>
            <label htmlFor="cvInput">
              <div className={styles.uploadArea}>
                <div className={styles.uploadIcon}>📄</div>
                <div className={styles.uploadText}>PDF dosyanızı seçin</div>
                <div className={styles.uploadSubtext}>veya buraya sürükleyin</div>
              </div>
            </label>

            <input
              id="cvInput"
              type="file"
              accept=".pdf"
              className={styles.fileInput}
              onChange={handleDosyaSec}
            />

            {dosya && (
              <div className={styles.selectedFile}>
                <span className={styles.fileIcon}>📎</span>
                <div>
                  <div className={styles.fileName}>{dosya.name}</div>
                  <div className={styles.fileSize}>{formatBoyut(dosya.size)}</div>
                </div>
              </div>
            )}

            <button
              className={styles.uploadBtn}
              onClick={handleYukle}
              disabled={!dosya || yukleniyor}
            >
              {yukleniyor ? '⏳ Yükleniyor...' : 'CV Yükle ve Analiz Et'}
            </button>
          </div>
        ) : (
          <div className={styles.successCard}>
            <div className={styles.successIcon}>✅</div>
            <div className={styles.successText}>CV başarıyla yüklendi!</div>
            <div className={styles.successSubtext}>
              AI analiziniz hazırlanıyor...
            </div>
            <button
              className={styles.uploadBtn}
              onClick={() => navigate('/dashboard')}
              style={{marginTop: '1.5rem'}}
            >
              Dashboard'a Dön
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CVUpload