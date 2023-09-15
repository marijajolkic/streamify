const { pool } = require('../database');

const getAllActors = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM actors');
    return rows;
  } catch (error) {
    throw error;
  }
};

const getActorById = async (id) => {
  try {
    const [rows] = await pool.query('SELECT * FROM actors WHERE actor_id = ?', [id]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

const addActor = async (data) => {
  try {
    const [result] = await pool.query('INSERT INTO actors (actor_name) VALUES (?)', [data.actor_name]);
    return result.insertId;
  } catch (error) {
    throw error;
  }
};

const updateActor = async (id, data) => {
  try {
    await pool.query('UPDATE actors SET actor_name = ? WHERE actor_id = ?', [data.actor_name, id]);
  } catch (error) {
    throw error;
  }
};

const deleteActor = async (id) => {
  try {
    await pool.query('DELETE FROM actors WHERE actor_id = ?', [id]);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllActors,
  getActorById,
  addActor,
  updateActor,
  deleteActor,
};
