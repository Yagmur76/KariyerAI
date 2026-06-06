const express = require("express");
const router = express.Router();
const { getMatchScore } = require("../controllers/aiController");

// POST /api/ai/match → AI eşleştirme skoru
router.post("/match", getMatchScore);

module.exports = router;