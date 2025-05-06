const gymService = require('../services/gymService');

const getGyms = (req, res) => {
  try {
    const gyms = gymService.getGyms();
    res.status(200).json(gyms);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read data' });
  }
};

const getGymById = (req, res) => {
  const { id } = req.params;
  const gym = gymService.getGymById(id);
  if (gym) {
    res.status(200).json(gym);
  } else {
    res.status(404).json({ error: 'Gym not found' });
  }
};

const createGym = (req, res) => {
  const { name, rating } = req.body;
  const newGym = gymService.createGym(name, rating);
  res.status(201).json(newGym);
};

const updateGym = (req, res) => {
  const { id } = req.params;
  const { name, rating } = req.body;
  const updatedGym = gymService.updateGym(id, name, rating);
  if (updatedGym) {
    res.status(200).json(updatedGym);
  } else {
    res.status(404).json({ error: 'Gym not found' });
  }
};

const patchGymRating = (req, res) => {
  const { id } = req.params;
  const updatedGym = gymService.patchGymRating(id);
  if (updatedGym) {
    res.status(200).json(updatedGym);
  } else {
    res.status(404).json({ error: 'Gym not found' });
  }
};

const deleteGym = (req, res) => {
  const { id } = req.params;
  const result = gymService.deleteGym(id);
  if (result) {
    res.status(200).json({ message: 'Gym deleted' });
  } else {
    res.status(404).json({ error: 'Gym not found' });
  }
};

module.exports = {
  getGyms,
  getGymById,
  createGym,
  updateGym,
  patchGymRating,
  deleteGym
};