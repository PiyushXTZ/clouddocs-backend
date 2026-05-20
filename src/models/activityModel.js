const db = require('../config/db');

const getActivitiesByProject = async (projectId) => {
  const [rows] = await db.query(
    `SELECT a.*, u.name as user_name FROM activities a
     JOIN users u ON a.user_id = u.id
     WHERE a.project_id = ?
     ORDER BY a.timestamp DESC LIMIT 50`,
    [projectId]
  );
  return rows;
};

const getRecentByUser = async (userId) => {
  const [rows] = await db.query(
    `SELECT a.*, p.name as project_name FROM activities a
     JOIN projects p ON a.project_id = p.id
     WHERE a.user_id = ?
     ORDER BY a.timestamp DESC LIMIT 20`,
    [userId]
  );
  return rows;
};

module.exports = { getActivitiesByProject, getRecentByUser };