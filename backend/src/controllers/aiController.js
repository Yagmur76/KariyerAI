<<<<<<< HEAD
exports.getMatchScore = async (req, res) => {
  try {
    const fakeResponse = {
      match_score: 85,
      missing_skills: ['React', 'Docker', 'PostgreSQL'],
    };

    res.json({
      message: 'AI skoru hesaplandi!',
      data: fakeResponse,
    });
  } catch (err) {
    res.status(500).json({ error: 'AI servisi yanit vermedi' });
  }
};
=======
const axios = require("axios");

// Nurhan'ın AI servisine istek atar
exports.getMatchScore = async (req, res) => {
  try {
    const { cvText } = req.body;

    // Nurhan hazır olana kadar sahte veri dönüyoruz
    // Nurhan hazır olunca aşağıdaki sahte veriyi kaldırıp
    // gerçek isteği açacağız
    
    // SAHTE VERİ (şimdilik)
    const fakeResponse = {
      match_score: 85,
      missing_skills: ["React", "Docker", "PostgreSQL"]
    };

    res.json({
      message: "AI skoru hesaplandı!",
      data: fakeResponse
    });

    // GERÇEK KOD (Nurhan hazır olunca bunu açacağız)
    // const response = await axios.post("http://localhost:8000/api/ai/match", {
    //   cv_text: cvText
    // });
    // res.json({ message: "AI skoru hesaplandı!", data: response.data });

  } catch (err) {
    res.status(500).json({ error: "AI servisi yanıt vermedi" });
  }
};
>>>>>>> origin/main
