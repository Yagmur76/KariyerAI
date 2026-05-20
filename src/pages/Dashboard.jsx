import { useNavigate } from 'react-router-dom'
import styles from './Dashboard.module.css'

function Dashboard() {
  const navigate = useNavigate()

  const handleLogout = () => {
    alert('Çıkış yapıldı!')
    navigate('/login')
  }

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <span className={styles.logo}>KariyerAI</span>
        <div className={styles.navRight}>
          <span className={styles.username}>Merhaba, Helin 👋</span>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Çıkış Yap
          </button>
        </div>
      </nav>

      <div className={styles.content}>
        <h1 className={styles.welcome}>Hoş geldin, Helin!</h1>
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
            <div className={styles.cardValue}>6 ilan</div>
          </div>

          <div className={styles.card} onClick={() => navigate('/profile')} style={{cursor:'pointer'}}>
            <div className={styles.cardIcon}>🎯</div>
            <div className={styles.cardTitle}>Profilim</div>
            <div className={styles.cardValue}>Görüntüle</div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon}>🔔</div>
            <div className={styles.cardTitle}>Bildirimler</div>
            <div className={styles.cardValue}>0</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard