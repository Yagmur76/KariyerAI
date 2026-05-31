// src/components/SkillCard.jsx

function SkillCard({ skill, isMissing = false }) {
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
        color: isMissing ? "#92400E" : "#065F46"
      }}
    >
      {skill}
    </span>
  );
}

export default SkillCard; 