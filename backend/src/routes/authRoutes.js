const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Kimlik dogrulama islemleri
 */

/**
 * @swagger
 * /api/auth/register/student:
 *   post:
 *     summary: Ogrenci kaydi (UC-01)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, name]
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *               name: { type: string }
 *     responses:
 *       201:
 *         description: Kayit basarili
 */
router.post('/register/student', authController.registerStudent);

/**
 * @swagger
 * /api/auth/register/firm:
 *   post:
 *     summary: Firma kaydi (UC-11)
 *     tags: [Auth]
 */
router.post('/register/firm', authController.registerFirm);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Genel kayit (role ile)
 *     tags: [Auth]
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Giris (UC-02, UC-12)
 *     tags: [Auth]
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Cikis (UC-02)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 */
router.post('/logout', authMiddleware, authController.logout);

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Sifre sifirlama istegi (UC-02)
 *     tags: [Auth]
 */
router.post('/forgot-password', authController.forgotPassword);

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Yeni sifre belirleme (UC-02)
 *     tags: [Auth]
 */
router.post('/reset-password', authController.resetPassword);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Oturum acmis kullanici bilgisi
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 */
router.get('/me', authMiddleware, authController.getMe);

module.exports = router;
