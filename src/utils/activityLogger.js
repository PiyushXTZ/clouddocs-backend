const db = require('../config/db');

const logActivity = async (userId, projectId, action) => {
  await db.query(
    'INSERT INTO activities (user_id, project_id, action) VALUES (?, ?, ?)',
    [userId, projectId, action]
  );
};

module.exports = logActivity;