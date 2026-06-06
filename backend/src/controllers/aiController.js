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
