import React from 'react';

// Ekinin yazdığı mevcut tekil etiket tasarımı (Aynen korundu)
export function SkillCard({ skill, isMissing = false }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 12px",
        borderRadius: "999px",
        fontSize: "13px",
        fontWeight: 500,
        margin: "4px",
        backgroundColor: isMissing ? "#FEF3C7" : "#D1FAE5",
        color: isMissing ? "#92400E" : "#065F46",
      }}
    >
      {skill}
    </span>
  );
}

// Bizim eklediğimiz: AI'dan gelen tüm listeyi yan yana şık bir kartta basan grup bileşeni
export default function SkillListCard({ skills = ["python", "react", "fastapi", "sql", "docker"] }) {
  return (
    <div style={{
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      maxWidth: '450px',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Kart Başlığı */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', gap: '8px' }}>
        <span style={{ fontSize: '20px' }}>🤖</span>
        <h3 style={{ margin: 0, fontSize: '18px', color: '#1f2937' }}>AI Tarafından Tespit Edilen Beceriler</h3>
      </div>
      
      <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '15px' }}>
        spaCy Doğal Dil İşleme (NLP) modelimiz, yüklediğiniz CV içerisinden aşağıdaki yetkinlikleri başarıyla ayıkladı:
      </p>

      {/* Etiketlerin yan yana dizildiği alan */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
        {skills.map((item, index) => (
          <SkillCard key={index} skill={item} isMissing={false} />
        ))}
      </div>

      <div style={{ marginTop: '20px', paddingTop: '12px', borderTop: '1px solid #f3f4f6', fontSize: '12px', color: '#9ca3af', textAlign: 'right' }}>
        Toplam {skills.length} kritik yetkinlik bulundu.
      </div>
    </div>
  );
}