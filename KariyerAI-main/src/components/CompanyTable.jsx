import React, { useState } from 'react';

// Şirketlerin göreceği örnek başvuru ve AI eşleşme verileri
const initialApplications = [
  { id: 1, studentName: 'Ahmet Yilmaz', jobTitle: 'Python Geliştirici', score: 85, status: 'Yüksek Eşleşme', date: '01.06.2026' },
  { id: 2, studentName: 'Ayşe Demir', jobTitle: 'Frontend Developer', score: 45, status: 'Orta Eşleşme', date: '02.06.2026' },
  { id: 3, studentName: 'Mehmet Kaya', jobTitle: 'Python Geliştirici', score: 15, status: 'Düşük Eşleşme', date: '29.05.2026' },
  { id: 4, studentName: 'Ece Öztürk', jobTitle: 'Full Stack Engineer', score: 92, status: 'Yüksek Eşleşme', date: '31.05.2026' },
];

export default function CompanyTable() {
  const [filter, setFilter] = useState('Hepsi');

  // Filtreleme mantığı (AI durumuna göre filtrele)
  const filteredData = initialApplications.filter(app => {
    if (filter === 'Hepsi') return true;
    return app.status === filter;
  });

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ color: '#333', marginBottom: '10px' }}>Gelen Başvurular ve AI Aday Eşleşmeleri</h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>Yapay zeka motorunun skorlarına göre adayları filtreleyebilirsiniz.</p>

      {/* Filtreleme Butonları */}
      <div style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
        {['Hepsi', 'Yüksek Eşleşme', 'Orta Eşleşme', 'Düşük Eşleşme'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: '1px solid #ccc',
              backgroundColor: filter === status ? '#4f46e5' : '#fff',
              color: filter === status ? '#fff' : '#333',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Başvuru Tablosu */}
      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f5f7', textAlign: 'left', borderBottom: '2px solid #eef0f3' }}>
            <th style={{ padding: '12px 15px' }}>Öğrenci Adi</th>
            <th style={{ padding: '12px 15px' }}>Başvurulan İlan</th>
            <th style={{ padding: '12px 15px' }}>Başvuru Tarihi</th>
            <th style={{ padding: '12px 15px' }}>AI Match Skoru</th>
            <th style={{ padding: '12px 15px' }}>Eşleşme Durumu</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((app) => (
            <tr key={app.id} style={{ borderBottom: '1px solid #eef0f3' }}>
              <td style={{ padding: '12px 15px', fontWeight: 'bold' }}>{app.studentName}</td>
              <td style={{ padding: '12px 15px', color: '#555' }}>{app.jobTitle}</td>
              <td style={{ padding: '12px 15px', color: '#777' }}>{app.date}</td>
              <td style={{ padding: '12px 15px', fontWeight: 'bold', color: '#4f46e5' }}>%{app.score}</td>
              <td style={{ padding: '12px 15px' }}>
                <span style={{
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  backgroundColor: app.status === 'Yüksek Eşleşme' ? '#dcfce7' : app.status === 'Orta Eşleşme' ? '#fef9c3' : '#fee2e2',
                  color: app.status === 'Yüksek Eşleşme' ? '#166534' : app.status === 'Orta Eşleşme' ? '#854d0e' : '#991b1b'
                }}>
                  {app.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}