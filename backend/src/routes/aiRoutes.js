const express = require('express');
const router = express.Router();
const { getMatchScore } = require('../controllers/aiController');

router.post('/match', getMatchScore);

module.exports = router;
