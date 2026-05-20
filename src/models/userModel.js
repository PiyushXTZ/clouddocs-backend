const db = require('../config/db');

const findByEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

const createUser = async (name, email, hashedPassword) => {
  const [result] = await db.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, hashedPassword]
  );
  return result.insertId;
};

const findById = async (id) => {
  const [rows] = await db.query('SELECT id, name, email, role FROM users WHERE id = ?', [id]);
  return rows[0];
};

module.exports = { findByEmail, createUser, findById };