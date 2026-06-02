const express = require("express");
/**
 * @swagger
 * /api/applications:
 *   post:
 *     summary: Öğrenci ilana başvurur
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jobId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Başvuru başarılı
 */
const express = require('express');
const router = express.Router();
const { applyToJob, getMyApplications, updateStatus, filterCandidates } = require("../controllers/applicationController");

router.post("/", applyToJob);
router.get("/user/:userId", getMyApplications);
router.put("/:id/status", updateStatus);
router.get("/filter", filterCandidates);
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
/**
 * @swagger
 * /api/applications:
 *   post:
 *     summary: Öğrenci ilana başvurur
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Başvuru başarılı
 */
router.post(
  '/',
  authMiddleware,
  roleMiddleware('STUDENT'),
  async (req, res) => {

    try {

      const { jobId } = req.body;

      const existingApplication = await prisma.application.findFirst({
        where: {
          userId: req.user.userId,
          jobId: jobId
        }
      });

      if (existingApplication) {
        return res.status(400).json({
          message: 'Bu ilana zaten başvurdunuz'
        });
      }

      const application = await prisma.application.create({
        data: {
          userId: req.user.userId,
          jobId: jobId
        }
      });

      res.json(application);

    } catch (err) {

      console.log(err);

      res.status(500).json(err);

    }

  }
);
/**
 * @swagger
 * /api/applications:
 *   get:
 *     summary: Tüm başvuruları getir
 *     tags: [Applications]
 *     responses:
 *       200:
 *         description: Başarılı
 */
router.get('/', async (req, res) => {

  const applications = await prisma.application.findMany({
    include: {
      user: true,
      job: true
    }
  });

  res.json(applications);

});
/**
 * @swagger
 * /api/applications/company:
 *   get:
 *     summary: Şirket kendi ilan başvurularını görür
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Başarılı
 */
router.get(
  '/company',
  authMiddleware,
  async (req, res) => {

    try {

      const applications = await prisma.application.findMany({

        where: {
          job: {
            companyId: req.user.userId
          }
        },

        include: {
          user: true,
          job: true
        }

      });

      res.json(applications);

    } catch (err) {

      console.log(err);

      res.status(500).json(err);

    }

  }
);

/**
 * @swagger
 * /api/applications/{id}/status:
 *   put:
 *     summary: Başvuru durumunu güncelle
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Başvuru ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: ACCEPTED
 *     responses:
 *       200:
 *         description: Başvuru güncellendi
 */
router.put(
  '/:id/status',
  authMiddleware,
  roleMiddleware('COMPANY'),
  async (req, res) => {

    try {

      const { id } = req.params;
      const { status } = req.body;

      const application = await prisma.application.update({
        where: {
          id: Number(id)
        },
        data: {
          status
        }
      });

      res.json(application);

    } catch (err) {

      console.log(err);

      res.status(500).json(err);

    }

  }
);


module.exports = router;