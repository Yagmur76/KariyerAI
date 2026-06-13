import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styles from './Dashboard.module.css'

function Dashboard() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const token = localStorage.getItem('token')

  const [ilanSayisi, setIlanSayisi] = useState(0)
  const [basvuruSayisi, setBasvuruSayisi] = useState(0)

  useEffect(() => {
    // İlan sayısını çek
    fetch('http://localhost:3000/api/jobs', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => setIlanSayisi(Array.isArray(data) ? data.length : 0))
      .catch(() => {})

    // Başvuru sayısını çek
    if (user.id) {
      fetch(`http://localhost:3000/api/applications/user/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(r => r.json())
        .then(data => setBasvuruSayisi(data.data ? data.data.length : 0))
        .catch(() => {})
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <span className={styles.logo}>KariyerAI</span>
        <div className={styles.navRight}>
          <span className={styles.username}>Merhaba, {user.name} 👋</span>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Çıkış Yap
          </button>
        </div>
      </nav>

      <div className={styles.content}>
        <h1 className={styles.welcome}>Hoş geldin, {user.name}!</h1>
        <p className={styles.subtitle}>Kariyer yolculuğuna devam et.</p>

        <div className={styles.cards}>
          <div className={styles.card} onClick={() => navigate('/cv-upload')} style={{cursor:'pointer'}}>
            <div className={styles.cardIcon}>📄</div>
            <div className={styles.cardTitle}>CV Durumu</div>
            <div className={styles.cardValue}>Yükle</div>
          </div>

          <div className={styles.card} onClick={() => navigate('/jobs')} style={{cursor:'pointer'}}>
            <div className={styles.cardIcon}>💼</div>
            <div className={styles.cardTitle}>İş İlanları</div>
            <div className={styles.cardValue}>{ilanSayisi} ilan</div>
          </div>

          <div className={styles.card} onClick={() => navigate('/profile')} style={{cursor:'pointer'}}>
            <div className={styles.cardIcon}>🎯</div>
            <div className={styles.cardTitle}>Profilim</div>
            <div className={styles.cardValue}>Görüntüle</div>
          </div>

          <div className={styles.card} onClick={() => navigate('/applications')} style={{cursor:'pointer'}}>
            <div className={styles.cardIcon}>📋</div>
            <div className={styles.cardTitle}>Başvurularım</div>
            <div className={styles.cardValue}>{basvuruSayisi} başvuru</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard