const db = require('../config/db');

const addMember = async (projectId, userId, role) => {
  await db.query(
    'INSERT INTO project_members (project_id, user_id, role) VALUES (?, ?, ?)',
    [projectId, userId, role]
  );
};

const getMembers = async (projectId) => {
  const [rows] = await db.query(
    `SELECT u.id, u.name, u.email, pm.role FROM project_members pm
     JOIN users u ON pm.user_id = u.id
     WHERE pm.project_id = ?`,
    [projectId]
  );
  return rows;
};

const updateRole = async (projectId, userId, role) => {
  await db.query(
    'UPDATE project_members SET role = ? WHERE project_id = ? AND user_id = ?',
    [role, projectId, userId]
  );
};

const removeMember = async (projectId, userId) => {
  await db.query(
    'DELETE FROM project_members WHERE project_id = ? AND user_id = ?',
    [projectId, userId]
  );
};

module.exports = { addMember, getMembers, updateRole, removeMember };