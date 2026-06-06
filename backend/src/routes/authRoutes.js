const { authenticate } = require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'gizli_anahtar';

router.post('/register', async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role
      }
    });

    res.json(user);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({
        message: 'Kullanıcı bulunamadı'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: 'Şifre yanlış'
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role
      },
      SECRET_KEY,
      {
        expiresIn: '7d'
      }
    );

  const { password: _, ...userWithoutPassword } = user;
res.json({
  token,
  user: userWithoutPassword
});

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/me', authenticate, async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ message: 'Token bulunamadı' });
    }

    const token = authHeader.split(' ')[1]; // "Bearer TOKEN" -> "TOKEN"
    
    const decoded = jwt.verify(token, SECRET_KEY);
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
        // password yok!
      }
    });

    res.json(user);

  } catch (err) {
    res.status(401).json({ message: 'Geçersiz token' });
  }
});

module.exports = router;