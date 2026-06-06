import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

// Admin panelinde görünecek örnek istatistik verileri (Aylara göre Kayıtlar)
const statData = [
  { name: 'Ocak', Ogrenci: 40, Ilan: 24 },
  { name: 'Şubat', Ogrenci: 65, Ilan: 35 },
  { name: 'Mart', Ogrenci: 90, Ilan: 50 },
  { name: 'Nisan', Ogrenci: 140, Ilan: 75 },
  { name: 'Mayis', Ogrenci: 210, Ilan: 110 },
  { name: 'Haziran', Ogrenci: 290, Ilan: 145 },
];

export default function AdminCharts() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
      <h2 style={{ marginBottom: '20px', color: '#333', fontFamily: 'Arial, sans-serif' }}>
        KariyerAI Genel İstatistik Paneli
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', minHeight: '350px' }}>
        
        {/* 1. Grafik: Öğrenci ve İlan Dağılımı (Bar Chart) */}
        <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '15px', color: '#555' }}>Kayit Dağilim Grafiği</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Ogrenci" name="Yeni Öğrenci" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Ilan" name="Yayinlanan İlan" fill="#06b6d4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 2. Grafik: Platform Büyüme Trendi (Line Chart) */}
        <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '15px', color: '#555' }}>Aylimk Büyüme Trendi</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={statData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Ogrenci" name="Öğrenci Artisi" stroke="#4f46e5" strokeWidth={3} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="Ilan" name="İlan Artisi" stroke="#06b6d4" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}