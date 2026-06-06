const express = require('express');
const router = express.Router();
<<<<<<< HEAD
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
=======

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: req.body
    });

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

module.exports = router;
>>>>>>> origin/main
