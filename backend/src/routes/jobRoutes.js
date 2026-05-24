const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

/**
 * @swagger
 * /api/jobs:
 *   get:
 *     summary: Tüm ilanları getir
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: Başarılı
 */
router.get('/', async (req, res) => {

  const jobs = await prisma.job.findMany();

  res.json(jobs);

});

/**
 * @swagger
 * /api/jobs:
 *   post:
 *     summary: Yeni ilan oluştur
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: İlan oluşturuldu
 */
router.post(
  '/',
  authMiddleware,
  roleMiddleware('COMPANY'),
  async (req, res) => {

    try {

      const job = await prisma.job.create({
        data: req.body
      });

      res.json(job);

    } catch (err) {

      console.log(err);

      res.status(500).json(err);

    }

  }
);

router.get('/', async (req, res) => {

const jobs = await prisma.job.findMany({
include: {
company: true,
applications: true
}
});

res.json(jobs);

});

/**
 * @swagger
 * /api/jobs/{id}:
 *   put:
 *     summary: İlan güncelle
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: İlan güncellendi
 */
router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('COMPANY'),
  async (req, res) => {

    try {

      const updatedJob = await prisma.job.update({
        where: {
          id: Number(req.params.id)
        },
        data: req.body
      });

      res.json(updatedJob);

    } catch (err) {

      console.log(err);

      res.status(500).json(err);

    }

  }
);
/**
 * @swagger
 * /api/jobs/{id}:
 *   delete:
 *     summary: İlan sil
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: İlan silindi
 */
router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('COMPANY'),
  async (req, res) => {

    try {

      await prisma.application.deleteMany({
        where: {
          jobId: Number(req.params.id)
        }
      });

      await prisma.job.delete({
        where: {
          id: Number(req.params.id)
        }
      });

      res.json({
        message: 'İlan silindi'
      });

    } catch (err) {

      console.log(err);

      res.status(500).json(err);

    }

  }
);

module.exports = router;