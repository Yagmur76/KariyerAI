import SkillCard from "./SkillCard";

// Gelen değişkenleri (props) kendi API çıktımıza uyduruyoruz
function MatchCard({ score, status }) {
  
  // Helin'in yazdığı değişkenlerin hata vermemesi için eşleştirme yapıyoruz
  const matchScore = score || 0; 
  const company = "KariyerAI Analizi";
  const position = "Eşleşme Durumu";
  const matchedSkills = []; 

  // Skor rengini belirle (Helin'in orijinal mantığı)
  const scoreColor =
    matchScore >= 80 ? "#065F46" :
    matchScore >= 60 ? "#92400E" : "#991B1B";

  const scoreBg =
    matchScore >= 80 ? "#D1FAE5" :
    matchScore >= 60 ? "#FEF3C7" : "#FEE2E2";

  return (
    <div
      style={{
        border: "1px solid #E5E7EB",
        borderRadius: "12px",
        padding: "20px",
        marginBottom: "16px",
        backgroundColor: "#FFF",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}
    >
      {/* Üst kısım */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600 }}>{position}</h3>
          <p style={{ margin: "4px 0 0", color: "#6B7280", fontSize: "14px" }}>{company}</p>
        </div>
        
        {/* Skor Alanı */}
        <div
          style={{
            backgroundColor: scoreBg,
            color: scoreColor,
            borderRadius: "8px",
            padding: "8px 16px",
            fontWeight: 700,
            fontSize: "20px",
          }}
        >
          %{matchScore}
        </div>
      </div>

      <div style={{ marginTop: "12px", fontSize: "14px", color: "#4B5563" }}>
        <strong>Sistem Mesaji:</strong> {status === "success" ? "Yapay zeka analizi başariyla tamamlandi." : status}
      </div>
    </div>
  );
}

export default MatchCard;