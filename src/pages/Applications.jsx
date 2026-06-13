import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styles from './Applications.module.css'

function Applications() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const token = localStorage.getItem('token')
  const [basvurular, setBasvurular] = useState([])

  useEffect(() => {
    if (user.id) {
      fetch(`http://localhost:3000/api/applications/user/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(r => r.json())
        .then(data => setBasvurular(data.data || []))
        .catch(() => {})
    }
  }, [])

  const durumBadge = (durum) => {
    if (durum === 'PENDING') return <span className={`${styles.badge} ${styles.beklemede}`}>⏳ Beklemede</span>
    if (durum === 'ACCEPTED') return <span className={`${styles.badge} ${styles.kabul}`}>✅ Kabul</span>
    if (durum === 'REJECTED') return <span className={`${styles.badge} ${styles.red}`}>❌ Red</span>
    return <span className={styles.badge}>{durum}</span>
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
        <h1 className={styles.title}>Başvurularım</h1>
        <p className={styles.subtitle}>Yaptığın başvuruları buradan takip edebilirsin.</p>

        {basvurular.length === 0 ? (
          <div className={styles.table}>
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>📭</div>
              <p>Henüz başvuru yapmadınız.</p>
            </div>
          </div>
        ) : (
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              <span>Pozisyon</span>
              <span>Şirket</span>
              <span>Tarih</span>
              <span>Durum</span>
            </div>
            {basvurular.map(basvuru => (
              <div key={basvuru.id} className={styles.tableRow}>
                <div className={styles.jobTitle}>{basvuru.job?.title || '-'}</div>
                <div className={styles.date}>{basvuru.job?.company?.name || basvuru.job?.companyId || '-'}</div>
                <div className={styles.date}>{new Date(basvuru.appliedAt).toLocaleDateString('tr-TR')}</div>
                <div>{durumBadge(basvuru.status)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Applications