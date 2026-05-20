const express = require('express');
const router = express.Router();
const { projectActivities, recentActivities } = require('../controllers/activityController');
const { protect } = require('../middleware/authMiddleware');
const { checkProjectAccess } = require('../middleware/roleMiddleware');

router.get('/recent', protect, recentActivities);
router.get('/projects/:id', protect, checkProjectAccess, projectActivities);

module.exports = router;