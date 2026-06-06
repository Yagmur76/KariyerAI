import { useNavigate } from 'react-router-dom'
import styles from './Applications.module.css'

const sahteBasvurular = [
  {
    id: 1,
    baslik: 'Frontend Developer',
    sirket: 'TechCo',
    tarih: '18 Mayıs 2026',
    durum: 'beklemede'
  },
  {
    id: 2,
    baslik: 'Full Stack Developer',
    sirket: 'WebAgency',
    tarih: '15 Mayıs 2026',
    durum: 'kabul'
  },
  {
    id: 3,
    baslik: 'Backend Developer',
    sirket: 'StartupX',
    tarih: '10 Mayıs 2026',
    durum: 'red'
  }
]

function Applications() {
  const navigate = useNavigate()

  const durumBadge = (durum) => {
    if (durum === 'beklemede') return <span className={`${styles.badge} ${styles.beklemede}`}>⏳ Beklemede</span>
    if (durum === 'kabul') return <span className={`${styles.badge} ${styles.kabul}`}>✅ Kabul</span>
    if (durum === 'red') return <span className={`${styles.badge} ${styles.red}`}>❌ Red</span>
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

        {sahteBasvurular.length === 0 ? (
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
            {sahteBasvurular.map(basvuru => (
              <div key={basvuru.id} className={styles.tableRow}>
                <div className={styles.jobTitle}>{basvuru.baslik}</div>
                <div className={styles.date}>{basvuru.sirket}</div>
                <div className={styles.date}>{basvuru.tarih}</div>
                <div>{durumBadge(basvuru.durum)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Applications