const express = require('express');
const router = express.Router();
const prisma = require('../utils/prisma');
const authMiddleware = require('../middlewares/authMiddleware');
const { requireFirm } = require('../middlewares/roleMiddleware');

/**
 * @swagger
 * /api/jobs:
 *   get:
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
});

/**
 * @swagger
 * /api/jobs:
 *   post:
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
