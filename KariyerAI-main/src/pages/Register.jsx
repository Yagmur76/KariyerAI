import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Register.module.css'

function Register() {
  const [ad, setAd] = useState('')
  const [email, setEmail] = useState('')
  const [sifre, setSifre] = useState('')
  const [rol, setRol] = useState('STUDENT')
  const [hata, setHata] = useState('')
  const navigate = useNavigate()

  const handleRegister = async () => {
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

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: ad, email, password: sifre, role: rol })
      })

      const data = await response.json()

      if (!response.ok) {
        setHata(data.message || 'Kayıt başarısız!')
        return
      }

      alert('Kayıt başarılı! Giriş yapabilirsiniz.')
      navigate('/login')
    } catch (err) {
      setHata('Sunucuya bağlanılamadı!')
    }
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
          <option value="STUDENT">Öğrenci</option>
          <option value="COMPANY">Firma</option>
        </select>

        {hata && <div className={styles.error}>{hata}</div>}

        <button onClick={handleRegister}