const db = require('../config/db');

const createProject = async (name, description, ownerId) => {
  const [result] = await db.query(
    'INSERT INTO projects (name, description, owner_id) VALUES (?, ?, ?)',
    [name, description, ownerId]
  );
  return result.insertId;
};

const getProjectById = async (id) => {
  const [rows] = await db.query('SELECT * FROM projects WHERE id = ?', [id]);
  return rows[0];
};

const getProjectsByUser = async (userId) => {
  const [rows] = await db.query(
    `SELECT p.* FROM projects p
     JOIN project_members pm ON p.id = pm.project_id
     WHERE pm.user_id = ?`,
    [userId]
  );
  return rows;
};

const updateProject = async (id, name, description) => {
  await db.query('UPDATE projects SET name = ?, description = ? WHERE id = ?', [name, description, id]);
};

const deleteProject = async (id) => {
  await db.query('DELETE FROM projects WHERE id = ?', [id]);
};

module.exports = { createProject, getProjectById, getProjectsByUser, updateProject, deleteProject };