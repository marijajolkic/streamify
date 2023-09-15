const tvShowModel = require('../models/tvShowModel');

const getAllTVShows = async (req, res) => {
  try {
    const tvShows = await tvShowModel.getAllTVShows();
    res.status(200).json(tvShows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTVShowById = async (req, res) => {
  try {
    const tvShow = await tvShowModel.getTVShowById(req.params.id);
    if (!tvShow) {
      return res.status(404).json({ error: 'TV Show not found' });
    }
    res.status(200).json(tvShow);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addTVShow = async (req, res) => {
  try {
    const id = await tvShowModel.addTVShow(req.body);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTVShow = async (req, res) => {
  try {
    await tvShowModel.updateTVShow(req.params.id, req.body);
    res.status(200).json({ message: 'TV Show updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTVShow = async (req, res) => {
  try {
    await tvShowModel.deleteTVShow(req.params.id);
    res.status(200).json({ message: 'TV Show deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllTVShows,
  getTVShowById,
  addTVShow,
  updateTVShow,
  deleteTVShow,
};
