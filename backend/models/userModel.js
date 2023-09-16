const { pool } = require('../database');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const getAllUsers = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
  } catch (error) {
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE user_id = ?', [id]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

// Function to check if a username is taken
const isUsernameTaken = async (username) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE user_name = ?', [username]);
    return rows.length > 0; // If there are rows returned, the username is taken
  } catch (error) {
    throw error;
  }
};


const addUser = async (userData) => {
  try {
    const [result] = await pool.query('INSERT INTO users SET ?', userData);
    console.log('Insert result:', result); // Add this line to log the result of the query
    return result.insertId;
  } catch (error) {
    throw error;
  }
};


const updateUser = async (id, data) => {
  try {
    await pool.query('UPDATE users SET user_name = ? WHERE user_id = ?', [data.user_name, id]);
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    await pool.query('DELETE FROM users WHERE user_id = ?', [id]);
  } catch (error) {
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

const getUserRolesByUserId = async (userId) => {
  try {
    const [rows] = await pool.query('SELECT role_name FROM user_roles JOIN roles ON user_roles.role_id = roles.role_id WHERE user_id = ?', [userId]);
    return rows.map(row => row.role_name);
  } catch (error) {
    throw error;
  }
};

const assignRoleToUser = async (userId, roleId) => {
  try {
    await pool.query('INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)', [userId, roleId]);
  } catch (error) {
    throw error;
  }
};

// userModel.js
  // Adjust to your db connection

// ... Other methods

async function createResetToken(userId) {
  const resetToken = crypto.randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 3600000); // Set expiration time to 1 hour from now
  await pool.query('INSERT INTO reset_tokens (user_id, token, expires_at, created_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)', [userId, resetToken, expires]);
  return resetToken;
}

async function getUserIdByResetToken(resetToken) {
  const [rows] = await pool.query('SELECT user_id FROM reset_tokens WHERE token = ? AND expires_at > NOW()', [resetToken]);
  return rows[0] ? rows[0].user_id : null;
}

async function invalidateResetToken(resetToken) {
  await pool.query('DELETE FROM reset_tokens WHERE token = ?', [resetToken]);
}



// ... export your methods


module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  isUsernameTaken,
  getUserRolesByUserId,
  assignRoleToUser,
  createResetToken,
  getUserIdByResetToken,
  invalidateResetToken
};
