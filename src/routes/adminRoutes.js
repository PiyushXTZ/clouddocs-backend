const express = require('express');
const router = express.Router();
const { getStats, getAllUsers, getAllFiles, deleteUser } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admins only' });
  next();
};

router.get('/stats', protect, isAdmin, getStats);
router.get('/users', protect, isAdmin, getAllUsers);
router.get('/files', protect, isAdmin, getAllFiles);
router.delete('/users/:id', protect, isAdmin, deleteUser);

module.exports = router;