const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const { requireAdmin } = require('../middlewares/roleMiddleware');

router.use(authMiddleware, requireAdmin);
=======

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
>>>>>>> origin/main

/**
 * @swagger
 * /api/admin/jobs:
 *   get:
<<<<<<< HEAD
 *     summary: Admin tum ilanlari gorur
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.get('/jobs', adminController.getAllJobs);

/**
 * @swagger
 * /api/admin/users/pending:
 *   get:
 *     summary: Onay bekleyen firmalar
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.get('/users/pending', adminController.getPendingFirms);

/**
 * @swagger
 * /api/admin/users/{id}/approve:
 *   patch:
 *     summary: Kullanici/firma onayla (UC-22)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.patch('/users/:id/approve', adminController.approveUser);

/**
 * @swagger
 * /api/admin/users/{id}/reject:
 *   patch:
 *     summary: Kullanici/firma reddet (UC-22)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.patch('/users/:id/reject', adminController.rejectUser);

module.exports = router;
=======
 *     summary: Admin tüm ilanları görüntüler
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Başarılı
 */

router.get('/jobs', async (req, res) => {
  try {

    const jobs = await prisma.job.findMany();

    res.json(jobs);

  } catch (err) {

    console.log(err);

    res.status(500).json(err);

  }
});

module.exports = router;
>>>>>>> origin/main
