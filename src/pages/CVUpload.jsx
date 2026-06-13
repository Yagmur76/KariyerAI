import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './CVUpload.module.css'

function CVUpload() {
  const navigate = useNavigate()
  const [dosya, setDosya] = useState(null)
  const [yukleniyor, setYukleniyor] = useState(false)
  const [yuklendi, setYuklendi] = useState(false)
  const [analiz, setAnaliz] = useState(null)
  const [hata, setHata] = useState('')

  const handleDosyaSec = (e) => {
    const secilen = e.target.files[0]
    if (secilen && secilen.type === 'application/pdf') {
      setDosya(secilen)
      setHata('')
    } else {
      alert('Sadece PDF dosyası yükleyebilirsiniz!')
    }
  }

  const handleYukle = async () => {
    if (!dosya) return
    setYukleniyor(true)
    setHata('')

    try {
      const formData = new FormData()
      formData.append('dosya', dosya)

      const response = await fetch('http://localhost:8000/api/cv/analiz', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (response.ok) {
        setAnaliz(data)
        setYuklendi(true)
      } else {
        setHata('Analiz yapılamadı!')
      }
    } catch {
      setHata('AI servisine bağlanılamadı!')
    } finally {
      setYukleniyor(false)
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

            {hata && <p style={{color:'red', marginTop:'8px'}}>{hata}</p>}

            <button
              className={styles.uploadBtn}
              onClick={handleYukle}
              disabled={!dosya || yukleniyor}
            >
              {yukleniyor ? '⏳ AI Analiz ediyor...' : 'CV Yükle ve Analiz Et'}
            </button>
          </div>
        ) : (
          <div className={styles.successCard}>
            <div className={styles.successIcon}>✅</div>
            <div className={styles.successText}>CV başarıyla analiz edildi!</div>

            {analiz && (
              <div style={{marginTop: '1.5rem', textAlign: 'left', width: '100%'}}>
                <div style={{marginBottom: '1rem'}}>
                  <strong>🎯 Eşleşme Skoru: %{analiz.eslesme_skoru}</strong>
                  <div style={{background: '#e0e7ff', borderRadius: '8px', height: '12px', marginTop: '8px'}}>
                    <div style={{
                      background: '#4f46e5',
                      width: `${analiz.eslesme_skoru}%`,
                      height: '100%',
                      borderRadius: '8px'
                    }}/>
                  </div>
                </div>

                <div style={{marginBottom: '1rem'}}>
                  <strong>💡 Tespit Edilen Beceriler:</strong>
                  <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px'}}>
                    {analiz.beceriler.length > 0 ? analiz.beceriler.map(b => (
                      <span key={b} style={{
                        background: '#e0e7ff', color: '#4f46e5',
                        padding: '4px 12px', borderRadius: '20px', fontSize: '14px'
                      }}>{b}</span>
                    )) : <span style={{color:'#888'}}>Beceri tespit edilemedi</span>}
                  </div>
                </div>

                <div>
                  <strong>⚠️ Eksik Beceriler:</strong>
                  <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px'}}>
                    {analiz.eksik_beceriler.map(b => (
                      <span key={b} style={{
                        background: '#fee2e2', color: '#dc2626',
                        padding: '4px 12px', borderRadius: '20px', fontSize: '14px'
                      }}>{b}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <button
              className={styles.uploadBtn}
              onClick={() => { setYuklendi(false); setDosya(null); setAnaliz(null) }}
              style={{marginTop: '1.5rem', marginRight: '1rem', background: '#6b7280'}}
            >
              Yeni CV Yükle
            </button>
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