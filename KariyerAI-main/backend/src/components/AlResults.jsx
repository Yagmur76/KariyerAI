// frontend/src/components/AIResults.jsx

import MatchCard from "./MatchCard";

// Sahte veri — Nurhan'ın algoritması hazır olunca burası API çağrısına dönüşecek
const MOCK_RESULTS = [
  {
    id: 1,
    company: "TechCorp A.Ş.",
    position: "Backend Developer",
    matchScore: 87,
    matchedSkills: ["Python", "FastAPI", "PostgreSQL", "Docker"],
    missingSkills: ["React", "Redis"],
  },
  {
    id: 2,
    company: "DataVision Ltd.",
    position: "Data Engineer",
    matchScore: 64,
    matchedSkills: ["Python", "PostgreSQL"],
    missingSkills: ["Spark", "Airflow", "Kafka"],
  },
  {
    id: 3,
    company: "StartupXYZ",
    position: "Fullstack Developer",
    matchScore: 42,
    matchedSkills: ["Python"],
    missingSkills: ["Node.js", "TypeScript", "React", "MongoDB"],
  },
];

function AIResults() {
  return (
    <div style={{ maxWidth: "680px", margin: "0 auto", padding: "24px" }}>
      <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "8px" }}>
        AI İş Önerileri
      </h2>
      <p style={{ color: "#6B7280", fontSize: "14px", marginBottom: "24px" }}>
        CV'ne göre en uygun ilanlar sıralandı.
      </p>

      {MOCK_RESULTS.map((result) => (
        <MatchCard
          key={result.id}
          company={result.company}
          position={result.position}
          matchScore={result.matchScore}
          matchedSkills={result.matchedSkills}
          missingSkills={result.missingSkills}
        />
      ))}
    </div>
  );
}

export default AIResults;