// models/categoryModel.js

const { pool } = require('../database');

const getAllCategories = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM categories');
    return rows;
  } catch (error) {
    throw error;
  }
};

const getCategoryById = async (id) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categories WHERE category_id = ?', [id]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

const addCategory = async (data) => {
  try {
    const [result] = await pool.query('INSERT INTO categories (category_name) VALUES (?)', [data.category_name]);
    return result.insertId;
  } catch (error) {
    throw error;
  }
};

const updateCategory = async (id, data) => {
  try {
    await pool.query('UPDATE categories SET category_name = ? WHERE category_id = ?', [data.category_name, id]);
  } catch (error) {
    throw error;
  }
};

const deleteCategory = async (id) => {
  try {
    await pool.query('DELETE FROM categories WHERE category_id = ?', [id]);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
};
