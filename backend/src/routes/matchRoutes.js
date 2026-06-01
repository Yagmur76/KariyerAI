const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * @swagger
 * /api/match/{userId}:
 *   get:
 *     summary: Kullanıcıya uygun işleri getir
 *     tags: [Match]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Kullanıcı ID
 *     responses:
 *       200:
 *         description: Eşleşen işler
 */

router.get('/:userId', async (req, res) => {

  try {

    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.userId)
      }
    });

    const jobs = await prisma.job.findMany();

    const results = jobs.map(job => {

      let score = 0;

      if (
        user.skills &&
        job.title.toLowerCase().includes(user.skills.toLowerCase())
      ) {
        score = 100;
      }

      return {
        job,
        score
      };

    });

    results.sort((a, b) => b.score - a.score);

    res.json(results);

  } catch (err) {

    console.log(err);

    res.status(500).json(err);

  }

});

module.exports = router;