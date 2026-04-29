const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "KariyerAI Backend çalışıyor! 🚀" });
});

const applicationRoutes = require("./src/routes/applicationRoutes");
app.use("/api/applications", applicationRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor...`);
});