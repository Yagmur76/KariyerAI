import { useState, useEffect } from "react";
import MatchCard from "../MatchCard";

function AIResults() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Nurhan'ın FastAPI'sine istek at
    fetch("http://localhost:8000/api/ai/match", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        cv_text: "Python developer with FastAPI and PostgreSQL experience",
        job_text: "Looking for Python backend developer with Docker skills"
      })
    })
      .then(res => res.json())
      .then(data => {
        setResult(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Hata:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ color: "white", padding: "24px" }}>Analiz ediliyor...</p>;

  return (
    <div style={{ maxWidth: "680px", margin: "0 auto", padding: "24px" }}>
      <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "8px", color: "white" }}>
        AI İş Önerileri
      </h2>
      
      {result && (
        <MatchCard 
          score={result.match_score} 
          status={result.status} 
        />
      )}
    </div>
  );
}

export default AIResults;