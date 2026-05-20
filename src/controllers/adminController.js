const db = require('../config/db');

const getStats = async (req, res) => {
  try {
    const [[{ totalUsers }]] = await db.query('SELECT COUNT(*) as totalUsers FROM users');
    const [[{ totalProjects }]] = await db.query('SELECT COUNT(*) as totalProjects FROM projects');
    const [[{ totalFiles }]] = await db.query('SELECT COUNT(*) as totalFiles FROM files');
    const [[{ totalStorage }]] = await db.query('SELECT SUM(file_size) as totalStorage FROM files');
    res.json({ totalUsers, totalProjects, totalFiles, totalStorage: totalStorage || 0 });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const [users] = await db.query('SELECT id, name, email, role, created_at FROM users');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllFiles = async (req, res) => {
  try {
    const [files] = await db.query(
      `SELECT f.*, u.name as uploaded_by_name, p.name as project_name
       FROM files f JOIN users u ON f.uploaded_by = u.id JOIN projects p ON f.project_id = p.id`
    );
    res.json(files);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getStats, getAllUsers, getAllFiles, deleteUser };