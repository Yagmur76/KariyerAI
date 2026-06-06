const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { requireStudent, requireFirm } = require('../middlewares/roleMiddleware');
const {
  applyToJob,
  getMyApplications,
  updateStatus,
  filterCandidates,
} = require('../controllers/applicationController');

router.post('/', authMiddleware, requireStudent, applyToJob);
router.get('/me', authMiddleware, requireStudent, getMyApplications);
router.get('/user/:userId', authMiddleware, getMyApplications);
router.put('/:id/status', authMiddleware, requireFirm, updateStatus);
router.get('/filter', authMiddleware, requireFirm, filterCandidates);

module.exports = router;
