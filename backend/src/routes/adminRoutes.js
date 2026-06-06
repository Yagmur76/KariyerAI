const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * @swagger
 * /api/admin/jobs:
 *   get:
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