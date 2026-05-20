const express = require('express');
const router = express.Router();
const { create, getAll, getOne, update, remove } = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');
const { checkProjectAccess, requireOwner } = require('../middleware/roleMiddleware');

router.get('/', protect, getAll);
router.post('/', protect, create);
router.get('/:id', protect, checkProjectAccess, getOne);
router.put('/:id', protect, checkProjectAccess, requireOwner, update);
router.delete('/:id', protect, checkProjectAccess, requireOwner, remove);

module.exports = router;