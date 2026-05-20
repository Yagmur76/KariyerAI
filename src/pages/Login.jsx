import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Login.module.css'

function Login() {
  const [email, setEmail] = useState('')
  const [sifre, setSifre] = useState('')
  const [hata, setHata] = useState('')
  const navigate = useNavigate()

  const handleLogin = () => {
    if (!email || !sifre) {
      setHata('Email ve şifre boş olamaz!')
      return
    }
    if (sifre.length < 6) {
      setHata('Şifre en az 6 karakter olmalı!')
      return
    }
    setHata('')
       navigate('/dashboard')
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>KariyerAI</h1>
        <p className={styles.subtitle}>Hesabına giriş yap</p>

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

        {hata && <div className={styles.error}>{hata}</div>}

        <button onClick={handleLogin} className={styles.button}>
          Giriş Yap
        </button>

        <p className={styles.footer}>
          Hesabın yok mu?{' '}
          <span onClick={() => navigate('/register')} className={styles.link}>
            Kayıt Ol
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login