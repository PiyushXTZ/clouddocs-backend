const db = require('../config/db');

const checkProjectAccess = async (req, res, next) => {
  const projectId = req.params.id || req.params.projectId;
  const userId = req.user.id;
  try {
    const [rows] = await db.query(
      'SELECT role FROM project_members WHERE project_id = ? AND user_id = ?',
      [projectId, userId]
    );
    if (rows.length === 0) return res.status(403).json({ message: 'Access denied' });
    req.memberRole = rows[0].role;
    next();
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const requireEditor = (req, res, next) => {
  if (req.memberRole === 'viewer')
    return res.status(403).json({ message: 'Editors and owners only' });
  next();
};

const requireOwner = (req, res, next) => {
  if (req.memberRole !== 'owner')
    return res.status(403).json({ message: 'Owners only' });
  next();
};

module.exports = { checkProjectAccess, requireEditor, requireOwner };