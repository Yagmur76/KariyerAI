<<<<<<< HEAD
let fakeDB = [];
let idCounter = 1;

exports.applyToJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const userId = req.user.userId;

    if (!jobId) {
      return res.status(400).json({ error: 'jobId zorunludur' });
    }

    const existing = fakeDB.find(
      (app) => app.jobId === jobId && app.userId === userId
    );
    if (existing) {
      return res.status(400).json({ error: 'Bu ilana zaten basvurdunuz!' });
    }

    const newApplication = {
      id: idCounter++,
      jobId,
      userId,
      status: 'pending',
      createdAt: new Date(),
    };
    fakeDB.push(newApplication);

    res.status(201).json({ message: 'Basvuru basarili!', data: newApplication });
  } catch (err) {
    res.status(500).json({ error: 'Sunucu hatasi' });
=======
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
>>>>>>> origin/main
  }
};

exports.getMyApplications = async (req, res) => {
  try {
<<<<<<< HEAD
    const userId = req.user ? req.user.userId : parseInt(req.params.userId, 10);
    const myApps = fakeDB.filter((app) => app.userId === userId);
    res.json({ data: myApps });
  } catch (err) {
    res.status(500).json({ error: 'Sunucu hatasi' });
=======
    const { userId } = req.params;
    const apps = await prisma.application.findMany({
      where: { userId: parseInt(userId) },
      include: { job: true }
    });
    res.json({ data: apps });
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatasi" });
>>>>>>> origin/main
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
<<<<<<< HEAD
    const app = fakeDB.find((a) => a.id === parseInt(id, 10));
    if (!app) return res.status(404).json({ error: 'Basvuru bulunamadi' });
    app.status = status;
    res.json({ message: 'Durum guncellendi!', data: app });
  } catch (err) {
    res.status(500).json({ error: 'Sunucu hatasi' });
=======
    const app = await prisma.application.update({
      where: { id: parseInt(id) },
      data: { status }
    });
    res.json({ message: "Durum guncellendi!", data: app });
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatasi" });
>>>>>>> origin/main
  }
};

exports.filterCandidates = async (req, res) => {
  try {
<<<<<<< HEAD
    const { jobId, status, minScore } = req.query;
    let results = [...fakeDB];
    if (jobId) results = results.filter((app) => app.jobId === parseInt(jobId, 10));
    if (status) results = results.filter((app) => app.status === status);
    results = results.map((app) => ({
      ...app,
      matchScore: Math.floor(Math.random() * 100),
    }));
    results.sort((a, b) => b.matchScore - a.matchScore);
    if (minScore) {
      results = results.filter((app) => app.matchScore >= parseInt(minScore, 10));
    }
    res.json({
      message: 'Adaylar filtrelendi!',
      total: results.length,
      data: results,
    });
  } catch (err) {
    res.status(500).json({ error: 'Sunucu hatasi' });
  }
};
=======
    const { jobId, status } = req.query;
    const where = {};
    if (jobId) where.jobId = parseInt(jobId);
    if (status) where.status = status;
    const results = await prisma.application.findMany({
      where,
      include: { user: true, job: true }
    });
    res.json({ message: "Adaylar filtrelendi!", total: results.length, data: results });
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatasi" });
  }
};
>>>>>>> origin/main
