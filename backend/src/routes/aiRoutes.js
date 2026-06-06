<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const { getMatchScore } = require('../controllers/aiController');

router.post('/match', getMatchScore);

module.exports = router;
=======
const express = require("express");
const router = express.Router();
const { getMatchScore } = require("../controllers/aiController");

// POST /api/ai/match → AI eşleştirme skoru
router.post("/match", getMatchScore);

module.exports = router;
>>>>>>> origin/main
