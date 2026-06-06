const express = require('express');
const router = express.Router();
const prisma = require('../utils/prisma');
const sanitizeUser = require('../utils/sanitizeUser');
const authMiddleware = require('../middlewares/authMiddleware');
const { requireAdmin } = require('../middlewares/roleMiddleware');

router.get('/', authMiddleware, requireAdmin, async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users.map(sanitizeUser));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Kullanicilar getirilemedi' });
  }
});

module.exports = router;
