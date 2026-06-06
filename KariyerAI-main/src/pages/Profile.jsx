import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Profile.module.css'

function Profile() {
  const navigate = useNavigate()
  const [duzenle, setDuzenle] = useState(false)

  const [profil, setProfil] = useState({
    ad: 'Helin',
    soyad: 'Karakoç',
    email: 'helinkarakoc67@gmail.com',
    universite: 'Üniversite Adı',
    bolum: 'Bilgisayar Mühendisliği',
    sinif: '3'
  })

  const [gecici, setGecici] = useState({...profil})

  const handleKaydet = () => {
    setProfil(gecici)
    setDuzenle(false)
    alert('Profil güncellendi!')
  }

  const handleIptal = () => {
    setGecici({...profil})
    setDuzenle(false)
  }

  const beceriler = ['React', 'JavaScript', 'Python', 'CSS', 'Git']

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

        <div className={styles.card}>
          <div className={styles.avatar}>
            {profil.ad[0]}
          </div>
          <div className={styles.name}>{profil.ad} {profil.soyad}</div>
          <div className={styles.email}>{profil.email}</div>

          <label className={styles.label}>Ad</label>
          <input
            className={styles.input}
            value={duzenle ? gecici.ad : profil.ad}
            disabled={!duzenle}
            onChange={(e) => setGecici({...gecici, ad: e.target.value})}
          />

          <label className={styles.label}>Soyad</label>
          <input
            className={styles.input}
            value={duzenle ? gecici.soyad : profil.soyad}
            disabled={!duzenle}
            onChange={(e) => setGecici({...gecici, soyad: e.target.value})}
          />

          <label className={styles.label}>Üniversite</label>
          <input
            className={styles.input}
            value={duzenle ? gecici.universite : profil.universite}
            disabled={!duzenle}
            onChange={(e) => setGecici({...gecici, universite: e.target.value})}
          />

          <label className={styles.label}>Bölüm</label>
          <input
            className={styles.input}
            value={duzenle ? gecici.bolum : profil.bolum}
            disabled={!duzenle}
            onChange={(e) => setGecici({...gecici, bolum: e.target.value})}
          />

          <label className={styles.label}>Sınıf</label>
          <input
            className={styles.input}
            value={duzenle ? gecici.sinif : profil.sinif}
            disabled={!duzenle}
            onChange={(e) => setGecici({...gecici, sinif: e.target.value})}
          />

          <div className={styles.btnRow}>
            {!duzenle ? (
              <button className={styles.editBtn} onClick={() => setDuzenle(true)}>
                Düzenle
              </button>
            ) : (
              <>
                <button className={styles.saveBtn} onClick={handleKaydet}>
                  Kaydet
                </button>
                <button className={styles.cancelBtn} onClick={handleIptal}>
                  İptal
                </button>
              </>
            )}
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.sectionTitle}>Becerilerim</div>
          <div className={styles.tags}>
            {beceriler.map(b => (
              <span key={b} className={styles.tag}>{b}</span>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Profile