const actorModel = require('../models/actorModel');

const getAllActors = async (req, res) => {
  try {
    const actors = await actorModel.getAllActors();
    res.status(200).json(actors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getActorById = async (req, res) => {
  try {
    const actor = await actorModel.getActorById(req.params.id);
    if (!actor) {
      return res.status(404).json({ error: 'Actor not found' });
    }
    res.status(200).json(actor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addActor = async (req, res) => {
  try {
    const id = await actorModel.addActor(req.body);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateActor = async (req, res) => {
  try {
    await actorModel.updateActor(req.params.id, req.body);
    res.status(200).json({ message: 'Actor updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteActor = async (req, res) => {
  try {
    await actorModel.deleteActor(req.params.id);
    res.status(200).json({ message: 'Actor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllActors,
  getActorById,
  addActor,
  updateActor,
  deleteActor,
};
