const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../db.json');

const readDatabase = () => {
  const data = fs.readFileSync(dbPath);
  return JSON.parse(data);
};

const writeDatabase = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

const getGyms = () => {
  return readDatabase();
};

const getGymById = (id) => {
  const gyms = readDatabase();
  return gyms.find(gym => gym.id === id);
};

const createGym = (name, rating) => {
  const gyms = readDatabase();
  const id = (gyms.length + 1).toString();
  const createdAt = new Date().toISOString();
  const newGym = { id, name, rating, createdAt };
  gyms.push(newGym);
  writeDatabase(gyms);
  return newGym;
};

const updateGym = (id, name, rating) => {
  const gyms = readDatabase();
  const index = gyms.findIndex(gym => gym.id === id);
  if (index !== -1) {
    gyms[index] = { ...gyms[index], name, rating };
    writeDatabase(gyms);
    return gyms[index];
  }
  return null;
};

const patchGymRating = (id) => {
  const gyms = readDatabase();
  const gym = gyms.find(g => g.id === id);
  if (gym) {
    gym.rating = (gym.rating - 0.1).toFixed(1);
    writeDatabase(gyms);
    return gym;
  }
  return null;
};

const deleteGym = (id) => {
  const gyms = readDatabase();
  const index = gyms.findIndex(g => g.id === id);
  if (index !== -1) {
    gyms.splice(index, 1);
    writeDatabase(gyms);
    return true;
  }
  return false;
};

module.exports = {
  getGyms,
  getGymById,
  createGym,
  updateGym,
  patchGymRating,
  deleteGym
};
