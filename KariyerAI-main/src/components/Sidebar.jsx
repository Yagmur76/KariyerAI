import React from 'react';

export default function Sidebar() {
  return (
    <div style={{
      width: '240px',
      height: '100vh',
      backgroundColor: '#1e293b',
      color: '#fff',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#38bdf8' }}>
        KariyerAI Admin
      </h2>
      
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={menuItemStyle}>📊 Dashboard</div>
        <div style={menuItemStyle}>💼 İlan Yönetimi</div>
        <div style={menuItemStyle}>👥 Kullanicilar</div>
        <div style={menuItemStyle}>⚙️ Ayarlar</div>
      </nav>
    </div>
  );
}

const menuItemStyle = {
  padding: '12px',
  borderRadius: '6px',
  cursor: 'pointer',
  backgroundColor: 'rgba(255,255,255,0.05)',
  transition: 'background 0.2s',
  fontSize: '15px'
};