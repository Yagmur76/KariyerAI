import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Register.module.css'

function Register() {
  const [ad, setAd] = useState('')
  const [email, setEmail] = useState('')
  const [sifre, setSifre] = useState('')
  const [rol, setRol] = useState('ogrenci')
  const [hata, setHata] = useState('')
  const navigate = useNavigate()

  const handleRegister = () => {
    if (!ad || !email || !sifre) {
      setHata('Tüm alanları doldurun!')
      return
    }
    if (sifre.length < 6) {
      setHata('Şifre en az 6 karakter olmalı!')
      return
    }
    if (!email.includes('@')) {
      setHata('Geçerli bir email girin!')
      return
    }
    setHata('')
    alert('Kayıt başarılı!')
    navigate('/login')
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>KariyerAI</h1>
        <p className={styles.subtitle}>Yeni hesap oluştur</p>

        <label className={styles.label}>Ad Soyad</label>
        <input
          type="text"
          placeholder="Adın Soyadın"
          value={ad}
          onChange={(e) => setAd(e.target.value)}
          className={styles.input}
        />

        <label className={styles.label}>Email</label>
        <input
          type="email"
          placeholder="ornek@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />

        <label className={styles.label}>Şifre</label>
        <input
          type="password"
          placeholder="••••••••"
          value={sifre}
          onChange={(e) => setSifre(e.target.value)}
          className={styles.input}
        />

        <label className={styles.label}>Rol</label>
        <select
          value={rol}
          onChange={(e) => setRol(e.target.value)}
          className={styles.select}
        >
          <option value="ogrenci">Öğrenci</option>
          <option value="firma">Firma</option>
        </select>

        {hata && <div className={styles.error}>{hata}</div>}

        <button onClick={handleRegister} className={styles.button}>
          Kayıt Ol
        </button>

        <p className={styles.footer}>
          Hesabın var mı?{' '}
          <span onClick={() => navigate('/login')} className={styles.link}>
            Giriş Yap
          </span>
        </p>
      </div>
    </div>
  )
}

export default Register