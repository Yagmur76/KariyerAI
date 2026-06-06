import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Jobs.module.css'

const sahteIlanlar = [
  {
    id: 1,
    baslik: 'Frontend Developer',
    sirket: 'TechCo',
    ikon: '💻',
    beceriler: ['React', 'JavaScript', 'CSS']
  },
  {
    id: 2,
    baslik: 'Backend Developer',
    sirket: 'StartupX',
    ikon: '⚙️',
    beceriler: ['Node.js', 'PostgreSQL', 'REST API']
  },
  {
    id: 3,
    baslik: 'Full Stack Developer',
    sirket: 'WebAgency',
    ikon: '🌐',
    beceriler: ['React', 'Node.js', 'MongoDB']
  },
  {
    id: 4,
    baslik: 'DevOps Engineer',
    sirket: 'CloudCorp',
    ikon: '🔧',
    beceriler: ['Docker', 'Kubernetes', 'AWS']
  },
  {
    id: 5,
    baslik: 'Mobile Developer',
    sirket: 'AppStudio',
    ikon: '📱',
    beceriler: ['React Native', 'JavaScript', 'Firebase']
  },
  {
    id: 6,
    baslik: 'ML Engineer',
    sirket: 'AILabs',
    ikon: '🤖',
    beceriler: ['Python', 'TensorFlow', 'scikit-learn']
  }
]

function Jobs() {
  const [arama, setArama] = useState('')
  const navigate = useNavigate()

  const filtrelenmisIlanlar = sahteIlanlar.filter(ilan =>
    ilan.baslik.toLowerCase().includes(arama.toLowerCase()) ||
    ilan.sirket.toLowerCase().includes(arama.toLowerCase()) ||
    ilan.beceriler.some(b => b.toLowerCase().includes(arama.toLowerCase()))
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
          placeholder="İlan, şirket veya beceri ara..."
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
                  <span className={styles.companyIcon}>{ilan.ikon}</span>
                  <div>
                    <div className={styles.jobTitle}>{ilan.baslik}</div>
                    <div className={styles.company}>{ilan.sirket}</div>
                  </div>
                </div>

                <div className={styles.tags}>
                  {ilan.beceriler.map(beceri => (
                    <span key={beceri} className={styles.tag}>{beceri}</span>
                  ))}
                </div>

                <button
                  className={styles.applyBtn}
                  onClick={() => alert(`${ilan.baslik} ilanına başvurdunuz!`)}
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