const express = require('express');
const router = express.Router();
const { invite, list, changeRole, remove } = require('../controllers/memberController');
const { protect } = require('../middleware/authMiddleware');
const { checkProjectAccess, requireOwner } = require('../middleware/roleMiddleware');

router.get('/projects/:id/members', protect, checkProjectAccess, list);
router.post('/projects/:id/members', protect, checkProjectAccess, requireOwner, invite);
router.put('/projects/:id/members/:userId', protect, checkProjectAccess, requireOwner, changeRole);
router.delete('/projects/:id/members/:userId', protect, checkProjectAccess, requireOwner, remove);

module.exports = router;