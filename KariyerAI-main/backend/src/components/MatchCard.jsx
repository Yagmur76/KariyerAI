// frontend/src/components/MatchCard.jsx

import SkillCard from "./SkillCard";

function MatchCard({ company, position, matchScore, missingSkills, matchedSkills }) {
  // Skor rengini belirle
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
        backgroundColor: "#fff",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}
    >
      {/* Üst kısım */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600 }}>{position}</h3>
          <p style={{ margin: "4px 0 0", color: "#6B7280", fontSize: "14px" }}>{company}</p>
        </div>
        {/* Skor */}
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

      {/* Eşleşen beceriler */}
      <div style={{ marginTop: "16px" }}>
        <p style={{ fontSize: "12px", color: "#6B7280", marginBottom: "6px" }}>Eşleşen beceriler:</p>
        {matchedSkills.map((skill) => (
          <SkillCard key={skill} skill={skill} isMissing={false} />
        ))}
      </div>

      {/* Eksik beceriler */}
      {missingSkills.length > 0 && (
        <div style={{ marginTop: "12px" }}>
          <p style={{ fontSize: "12px", color: "#6B7280", marginBottom: "6px" }}>Eksik beceriler:</p>
          {missingSkills.map((skill) => (
            <SkillCard key={skill} skill={skill} isMissing={true} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MatchCard;