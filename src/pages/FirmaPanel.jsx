import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function FirmaPanel() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const token = localStorage.getItem('token')
  const [ilanlar, setIlanlar] = useState([])
  const [form, setForm] = useState({ title: '', description: '', location: '' })
  const [mesaj, setMesaj] = useState('')

  useEffect(() => {
    if (user.role !== 'COMPANY') {
      alert('Bu sayfaya erişim yetkiniz yok!')
      navigate('/dashboard')
      return
    }
    fetch('http://localhost:3000/api/jobs', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => setIlanlar(Array.isArray(data) ? data.filter(j => j.companyId === user.id) : []))
      .catch(() => {})
  }, [])

  const handleIlanEkle = async () => {
    if (!form.title || !form.description || !form.location) {
      setMesaj('Tum alanlari doldurun!')
      return
    }
    try {
      const response = await fetch('http://localhost:3000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ ...form, companyId: user.id })
      })
      const data = await response.json()
      if (response.ok) {
        setIlanlar([...ilanlar, data])
        setForm({ title: '', description: '', location: '' })
        setMesaj('Ian basariyla eklendi!')
      } else {
        setMesaj('Ian eklenemedi!')
      }
    } catch {
      setMesaj('Sunucuya baglanılamadı!')
    }
  }

  return (
    <div style={{minHeight:'100vh', background:'#f8fafc'}}>
      <nav style={{background:'white', padding:'1rem 2rem', display:'flex', justifyContent:'space-between', alignItems:'center', boxShadow:'0 1px 3px rgba(0,0,0,0.1)'}}>
        <span style={{color:'#4f46e5', fontWeight:'bold', fontSize:'1.3rem'}}>KariyerAI Firma Paneli</span>
        <div style={{display:'flex', gap:'1rem', alignItems:'center'}}>
          <span style={{color:'#6b7280'}}>Merhaba, {user.name}</span>
          <button onClick={() => { localStorage.clear(); navigate('/login') }} style={{background:'#ef4444', color:'white', border:'none', padding:'0.5rem 1rem', borderRadius:'8px', cursor:'pointer'}}>
            Cikis
          </button>
        </div>
      </nav>

      <div style={{maxWidth:'900px', margin:'2rem auto', padding:'0 1rem'}}>
        <h1 style={{fontSize:'1.8rem', fontWeight:'bold', marginBottom:'1.5rem'}}>Firma Paneli</h1>

        <div style={{background:'white', borderRadius:'12px', padding:'1.5rem', boxShadow:'0 1px 3px rgba(0,0,0,0.1)', marginBottom:'2rem'}}>
          <h2 style={{fontSize:'1.2rem', fontWeight:'bold', marginBottom:'1rem'}}>Yeni Ilan Ekle</h2>
          <label style={{display:'block', marginBottom:'0.5rem', fontWeight:'500'}}>Ilan Basligi</label>
          <input type="text" placeholder="Frontend Developer" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} style={{width:'100%', padding:'0.75rem', borderRadius:'8px', border:'1px solid #e5e7eb', marginBottom:'1rem', boxSizing:'border-box'}} />
          <label style={{display:'block', marginBottom:'0.5rem', fontWeight:'500'}}>Aciklama</label>
          <input type="text" placeholder="Is tanimi..." value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} style={{width:'100%', padding:'0.75rem', borderRadius:'8px', border:'1px solid #e5e7eb', marginBottom:'1rem', boxSizing:'border-box'}} />
          <label style={{display:'block', marginBottom:'0.5rem', fontWeight:'500'}}>Konum</label>
          <input type="text" placeholder="Istanbul" value={form.location} onChange={(e) => setForm({...form, location: e.target.value})} style={{width:'100%', padding:'0.75rem', borderRadius:'8px', border:'1px solid #e5e7eb', marginBottom:'1rem', boxSizing:'border-box'}} />
          {mesaj && <p style={{color:'green', marginBottom:'1rem'}}>{mesaj}</p>}
          <button onClick={handleIlanEkle} style={{background:'#4f46e5', color:'white', border:'none', padding:'0.75rem 2rem', borderRadius:'8px', cursor:'pointer', fontWeight:'500'}}>
            Ilan Ekle
          </button>
        </div>

        <div style={{background:'white', borderRadius:'12px', padding:'1.5rem', boxShadow:'0 1px 3px rgba(0,0,0,0.1)'}}>
          <h2 style={{fontSize:'1.2rem', fontWeight:'bold', marginBottom:'1rem'}}>Ilanlarim ({ilanlar.length})</h2>
          {ilanlar.length === 0 ? (
            <p style={{color:'#888'}}>Henuz ilan eklemediniz.</p>
          ) : (
            ilanlar.map(ilan => (
              <div key={ilan.id} style={{borderBottom:'1px solid #f3f4f6', padding:'1rem 0'}}>
                <div style={{fontWeight:'bold'}}>{ilan.title}</div>
                <div style={{color:'#6b7280', fontSize:'14px'}}>{ilan.location} - {ilan.description}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default FirmaPanel