let fakeDB = [];
let idCounter = 1;

exports.applyToJob = async (req, res) => {
  try {
    const { jobId, userId } = req.body;

    const existing = fakeDB.find(
      (app) => app.jobId === jobId && app.userId === userId
    );
    if (existing) {
      return res.status(400).json({ error: "Bu ilana zaten başvurdunuz!" });
    }

    const newApplication = {
      id: idCounter++,
      jobId,
      userId,
      status: "pending",
      createdAt: new Date(),
    };

    fakeDB.push(newApplication);
    res.status(201).json({ message: "Başvuru başarılı!", data: newApplication });
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatası" });
  }
};

exports.getMyApplications = async (req, res) => {
  try {
    const { userId } = req.params;
    const myApps = fakeDB.filter((app) => app.userId === parseInt(userId));
    res.json({ data: myApps });
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatası" });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const app = fakeDB.find((a) => a.id === parseInt(id));
    if (!app) {
      return res.status(404).json({ error: "Başvuru bulunamadı" });
    }

    app.status = status;
    res.json({ message: "Durum güncellendi!", data: app });
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatası" });
  }
};