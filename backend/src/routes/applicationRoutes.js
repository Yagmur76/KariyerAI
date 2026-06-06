const express = require("express");
const router = express.Router();
const { applyToJob, getMyApplications, updateStatus, filterCandidates } = require("../controllers/applicationController");

router.post("/", applyToJob);
router.get("/user/:userId", getMyApplications);
router.put("/:id/status", updateStatus);
router.get("/filter", filterCandidates);

module.exports = router;