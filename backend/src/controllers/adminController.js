const prisma = require('../utils/prisma');
const sanitizeUser = require('../utils/sanitizeUser');

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      include: {
        company: { select: { id: true, name: true, email: true, companyName: true } },
        applications: true,
      },
    });
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ilanlar getirilemedi' });
  }
};

exports.getPendingFirms = async (req, res) => {
  try {
    const firms = await prisma.user.findMany({
      where: { role: 'FIRM', status: 'PENDING' },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ data: firms.map(sanitizeUser) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Bekleyen firmalar getirilemedi' });
  }
};

exports.approveUser = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: 'Kullanici bulunamadi' });
    }

    const updated = await prisma.user.update({
      where: { id },
      data: { status: 'APPROVED' },
    });

    res.json({
      message: 'Kullanici onaylandi',
      user: sanitizeUser(updated),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Onay islemi basarisiz' });
  }
};

exports.rejectUser = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: 'Kullanici bulunamadi' });
    }

    const updated = await prisma.user.update({
      where: { id },
      data: { status: 'REJECTED' },
    });

    res.json({
      message: 'Kullanici reddedildi',
      user: sanitizeUser(updated),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Red islemi basarisiz' });
  }
};
