const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const prisma = require('../utils/prisma');
const authMiddleware = require('../middlewares/authMiddleware');
const { requireFirm } = require('../middlewares/roleMiddleware');
=======

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
>>>>>>> origin/main

/**
 * @swagger
 * /api/jobs:
 *   get:
<<<<<<< HEAD
 *     summary: Tum ilanlari getir
 *     tags: [Jobs]
 */
router.get('/', async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      where: { isActive: true },
      include: {
        company: { select: { id: true, name: true, companyName: true } },
      },
    });
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ilanlar getirilemedi' });
  }
=======
 *     summary: Tüm ilanları getir
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: Başarılı
 */
router.get('/', async (req, res) => {

  const jobs = await prisma.job.findMany();

  res.json(jobs);

>>>>>>> origin/main
});

/**
 * @swagger
 * /api/jobs:
 *   post:
<<<<<<< HEAD
 *     summary: Yeni ilan olustur (firma)
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 */
router.post('/', authMiddleware, requireFirm, async (req, res) => {
  try {
    const { title, description, location } = req.body;

    const job = await prisma.job.create({
      data: {
        title,
        description,
        location,
        companyId: req.user.userId,
      },
    });

    res.status(201).json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ilan olusturulamadi' });
  }
});

router.put('/:id', authMiddleware, requireFirm, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const job = await prisma.job.findUnique({ where: { id } });

    if (!job) {
      return res.status(404).json({ message: 'Ilan bulunamadi' });
    }
    if (job.companyId !== req.user.userId) {
      return res.status(403).json({ message: 'Bu ilani guncelleyemezsiniz' });
    }

    const updatedJob = await prisma.job.update({
      where: { id },
      data: req.body,
    });

    res.json(updatedJob);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ilan guncellenemedi' });
  }
});

router.delete('/:id', authMiddleware, requireFirm, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const job = await prisma.job.findUnique({ where: { id } });

    if (!job) {
      return res.status(404).json({ message: 'Ilan bulunamadi' });
    }
    if (job.companyId !== req.user.userId) {
      return res.status(403).json({ message: 'Bu ilani silemezsiniz' });
    }

    await prisma.application.deleteMany({ where: { jobId: id } });
    await prisma.job.delete({ where: { id } });

    res.json({ message: 'Ilan silindi' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ilan silinemedi' });
  }
});

module.exports = router;
=======
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
>>>>>>> origin/main
