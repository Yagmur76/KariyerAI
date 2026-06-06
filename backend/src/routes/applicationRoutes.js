const express = require("express");
const router = express.Router();
const { applyToJob, getMyApplications, updateStatus, filterCandidates } = require("../controllers/applicationController");
const authenticate = require("../middlewares/authMiddleware");

router.post("/", authenticate, applyToJob);
router.get("/user/:userId", authenticate, getMyApplications);
router.put("/:id/status", authenticate, updateStatus);
router.get("/filter", authenticate, filterCandidates);

module.exports = router;