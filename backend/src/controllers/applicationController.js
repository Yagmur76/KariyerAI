const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.applyToJob = async (req, res) => {
  try {
    const { jobId, userId } = req.body;
    const existing = await prisma.application.findFirst({
      where: { jobId: parseInt(jobId), userId: parseInt(userId) }
    });
    if (existing) {
      return res.status(400).json({ error: "Bu ilana zaten basvurdunuz!" });
    }
    const newApp = await prisma.application.create({
      data: { jobId: parseInt(jobId), userId: parseInt(userId) }
    });
    res.status(201).json({ message: "Basvuru basarili!", data: newApp });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Sunucu hatasi" });
  }
};

exports.getMyApplications = async (req, res) => {
  try {
    const { userId } = req.params;
    const apps = await prisma.application.findMany({
      where: { userId: parseInt(userId) },
      include: { job: true }
    });
    res.json({ data: apps });
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatasi" });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const app = await prisma.application.update({
      where: { id: parseInt(id) },
      data: { status }
    });
    res.json({ message: "Durum guncellendi!", data: app });
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatasi" });
  }
};

exports.filterCandidates = async (req, res) => {
  try {
    const { jobId, status } = req.query;
    const where = {};
    if (jobId) where.jobId = parseInt(jobId);
    if (status) where.status = status;
    const results = await prisma.application.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true
          }
        },
        job: true
      }
    });
    res.json({ message: "Adaylar filtrelendi!", total: results.length, data: results });
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatasi" });
  }
};