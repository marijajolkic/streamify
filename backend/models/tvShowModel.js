const { pool } = require('../database');

const getAllTVShows = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM tv_shows');
    return rows;
  } catch (error) {
    throw error;
  }
};

const getTVShowById = async (id) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tv_shows WHERE tv_show_id = ?', [id]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

const addTVShow = async (data) => {
  try {
    const [result] = await pool.query('INSERT INTO tv_shows (tv_show_name, number_of_seasons, release_date) VALUES (?, ?, ?)', 
    [data.tv_show_name, data.number_of_seasons, data.release_date]);
    
    const tvShowId = result.insertId;

    // If actors are associated, insert them into the tv_show_actors table
    if(data.actors && data.actors.length){
      for(const actorId of data.actors) {
        await pool.query('INSERT INTO tv_show_actors (tv_show_id, actor_id) VALUES (?, ?)', [tvShowId, actorId]);
      }
    }

    // If categories are associated, insert them into the tv_show_categories table
    if(data.categories && data.categories.length){
      for(const categoryId of data.categories) {
        await pool.query('INSERT INTO tv_show_categories (tv_show_id, category_id) VALUES (?, ?)', [tvShowId, categoryId]);
      }
    }

    return tvShowId;
  } catch (error) {
    throw error;
  }
};

const updateTVShow = async (id, data) => {
  try {
    await pool.query('UPDATE tv_shows SET tv_show_name = ?, number_of_seasons = ?, release_date = ? WHERE tv_show_id = ?', 
    [data.tv_show_name, data.number_of_seasons, data.release_date, id]);
    
    // Additional logic to update actors and categories will be needed here

  } catch (error) {
    throw error;
  }
};

const deleteTVShow = async (id) => {
  try {
    // Additional logic to delete relationships from tv_show_actors and tv_show_categories first will be needed here

    await pool.query('DELETE FROM tv_shows WHERE tv_show_id = ?', [id]);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllTVShows,
  getTVShowById,
  addTVShow,
  updateTVShow,
  deleteTVShow,
};
