
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Kullanıcı giriş işlemleri
 */

const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'gizli_anahtar';

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Kullanıcı kayıt ol
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *               skills:
 *                 type: string
 *     responses:
 *       200:
 *         description: Kullanıcı oluşturuldu
 */

router.post('/register', async (req, res) => {

  try {

    const { email, password, name, role, skills } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
        skills
      }
    });

    res.json(user);

  } catch (err) {

    console.log(err);
    res.status(500).json(err);

  }

});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Kullanıcı giriş yap
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Giriş başarılı
 */

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

    res.json({
      token,
      user
    });

  } catch (err) {

    console.log(err);
    res.status(500).json(err);

  }

});

module.exports = router;
