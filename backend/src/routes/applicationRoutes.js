const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

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

router.get('/', async (req, res) => {

  const applications = await prisma.application.findMany({
    include: {
      user: true,
      job: true
    }
  });

  res.json(applications);

});

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

module.exports = router;