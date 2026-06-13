import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Admin() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const [jobs, setJobs] = useState([])
  const [aktifTab, setAktifTab] = useState('jobs')

  useEffect(() => {
    if (user.role !== 'ADMIN') {
      alert('Bu sayfaya erişim yetkiniz yok!')
      navigate('/dashboard')
      return
    }

    fetch('http://localhost:3000/api/admin/jobs', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => setJobs(Array.isArray(data) ? data : []))
      .catch(() => {})
  }, [])

  return (
    <div style={{minHeight:'100vh', background:'#f8fafc'}}>
      <nav style={{background:'white', padding:'1rem 2rem', display:'flex', justifyContent:'space-between', alignItems:'center', boxShadow:'0 1px 3px rgba(0,0,0,0.1)'}}>
        <span style={{color:'#4f46e5', fontWeight:'bold', fontSize:'1.3rem'}}>KariyerAI — Admin</span>
        <button onClick={() => navigate('/dashboard')} style={{background:'none', border:'none', cursor:'pointer', color:'#4f46e5', fontWeight:'500'}}>
          ← Dashboard
        </button>
      </nav>

      <div style={{maxWidth:'1000px', margin:'2rem auto', padding:'0 1rem'}}>
        <h1 style={{fontSize:'1.8rem', fontWeight:'bold', marginBottom:'1.5rem'}}>Admin Paneli</h1>

        <div style={{display:'flex', gap:'1rem', marginBottom:'1.5rem'}}>
          <button
            onClick={() => setAktifTab('jobs')}
            style={{padding:'0.5rem 1.5rem', borderRadius:'8px', border:'none', cursor:'pointer', background: aktifTab === 'jobs' ? '#4f46e5' : '#e0e7ff', color: aktifTab === 'jobs' ? 'white' : '#4f46e5', fontWeight:'500'}}
          >
            💼 İş İlanları ({jobs.length})
          </button>
        </div>

        {aktifTab === 'jobs' && (
          <div style={{background:'white', borderRadius:'12px', padding:'1.5rem', boxShadow:'0 1px 3px rgba(0,0,0,0.1)'}}>
            <h2 style={{marginBottom:'1rem', fontSize:'1.2rem'}}>Tüm İş İlanları</h2>
            {jobs.length === 0 ? (
              <p style={{color:'#888'}}>İlan bulunamadı.</p>
            ) : (
              <table style={{width:'100%', borderCollapse:'collapse'}}>
                <thead>
                  <tr style={{borderBottom:'2px solid #e5e7eb'}}>
                    <th style={{textAlign:'left', padding:'0.75rem', color:'#6b7280'}}>ID</th>
                    <th style={{textAlign:'left', padding:'0.75rem', color:'#6b7280'}}>Başlık</th>
                    <th style={{textAlign:'left', padding:'0.75rem', color:'#6b7280'}}>Konum</th>
                    <th style={{textAlign:'left', padding:'0.75rem', color:'#6b7280'}}>Durum</th>
                    <th style={{textAlign:'left', padding:'0.75rem', color:'#6b7280'}}>Tarih</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map(job => (
                    <tr key={job.id} style={{borderBottom:'1px solid #f3f4f6'}}>
                      <td style={{padding:'0.75rem', color:'#6b7280'}}>#{job.id}</td>
                      <td style={{padding:'0.75rem', fontWeight:'500'}}>{job.title}</td>
                      <td style={{padding:'0.75rem', color:'#6b7280'}}>{job.location}</td>
                      <td style={{padding:'0.75rem'}}>
                        <span style={{background: job.isActive ? '#d1fae5' : '#fee2e2', color: job.isActive ? '#065f46' : '#dc2626', padding:'2px 10px', borderRadius:'20px', fontSize:'13px'}}>
                          {job.isActive ? '✅ Aktif' : '❌ Pasif'}
                        </span>
                      </td>
                      <td style={{padding:'0.75rem', color:'#6b7280'}}>{new Date(job.createdAt).toLocaleDateString('tr-TR')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin