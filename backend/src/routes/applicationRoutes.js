const express = require("express");
const router = express.Router();
const {
  applyToJob,
  getMyApplications,
  updateStatus,
} = require("../controllers/applicationController");

router.post("/", applyToJob);
router.get("/user/:userId", getMyApplications);
router.put("/:id/status", updateStatus);

module.exports = router;