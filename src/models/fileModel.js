const db = require('../config/db');

const createFile = async (filename, originalName, fileUrl, fileSize, fileType, projectId, uploadedBy) => {
  const [result] = await db.query(
    'INSERT INTO files (filename, original_name, file_url, file_size, file_type, project_id, uploaded_by) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [filename, originalName, fileUrl, fileSize, fileType, projectId, uploadedBy]
  );
  return result.insertId;
};

const getFilesByProject = async (projectId) => {
  const [rows] = await db.query(
    `SELECT f.*, u.name as uploaded_by_name FROM files f
     JOIN users u ON f.uploaded_by = u.id
     WHERE f.project_id = ?`,
    [projectId]
  );
  return rows;
};

const getFileById = async (id) => {
  const [rows] = await db.query('SELECT * FROM files WHERE id = ?', [id]);
  return rows[0];
};

const deleteFile = async (id) => {
  await db.query('DELETE FROM files WHERE id = ?', [id]);
};

module.exports = { createFile, getFilesByProject, getFileById, deleteFile };