const express = require('express');
const router = express.Router();
const { upload, list, remove } = require('../controllers/fileController');
const { protect } = require('../middleware/authMiddleware');
const { checkProjectAccess, requireEditor } = require('../middleware/roleMiddleware');
const uploadMiddleware = require('../middleware/uploadMiddleware');

router.get('/projects/:id/files', protect, checkProjectAccess, list);
router.post('/projects/:id/files', protect, checkProjectAccess, requireEditor, uploadMiddleware.single('file'), upload);
router.delete('/files/:fileId', protect, remove);

module.exports = router;