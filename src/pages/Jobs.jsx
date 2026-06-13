import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Jobs.module.css'

function Jobs() {
  const [arama, setArama] = useState('')
  const [ilanlar, setIlanlar] = useState([])
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  useEffect(() => {
    fetch('http://localhost:3000/api/jobs', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => setIlanlar(Array.isArray(data) ? data : []))
      .catch(() => {})
  }, [])

  const handleBasvur = async (ilanId) => {
    try {
      const response = await fetch('http://localhost:3000/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ jobId: ilanId, userId: user.id })
      })
      const data = await response.json()
      if (response.ok) {
        alert('Başvurunuz alındı!')
      } else {
        alert(data.error || 'Başvuru yapılamadı!')
      }
    } catch {
      alert('Sunucuya bağlanılamadı!')
    }
  }

  const filtrelenmisIlanlar = ilanlar.filter(ilan =>
    ilan.title?.toLowerCase().includes(arama.toLowerCase()) ||
    ilan.location?.toLowerCase().includes(arama.toLowerCase())
  )

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
        <h1 className={styles.title}>İş İlanları</h1>

        <input
          type="text"
          placeholder="İlan veya konum ara..."
          value={arama}
          onChange={(e) => setArama(e.target.value)}
          className={styles.searchBar}
        />

        {filtrelenmisIlanlar.length === 0 ? (
          <p className={styles.noResult}>Aradığınız kriterlere uygun ilan bulunamadı.</p>
        ) : (
          <div className={styles.grid}>
            {filtrelenmisIlanlar.map(ilan => (
              <div key={ilan.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.companyIcon}>💼</span>
                  <div>
                    <div className={styles.jobTitle}>{ilan.title}</div>
                    <div className={styles.company}>{ilan.location}</div>
                  </div>
                </div>

                <div className={styles.tags}>
                  <span className={styles.tag}>{ilan.description}</span>
                </div>

                <button
                  className={styles.applyBtn}
                  onClick={() => handleBasvur(ilan.id)}
                >
                  Başvur
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Jobs