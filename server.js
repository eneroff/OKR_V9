const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5477;

app.use(bodyParser.json());

const dbPath = path.join(__dirname, 'db.json');

const readDatabase = () => {
  const data = fs.readFileSync(dbPath);
  return JSON.parse(data);
};

const writeDatabase = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

app.get('/', (req, res) => {
  res.send('Готово! Введите id');
});

app.get('/games', (req, res) => {
  try {
    const gyms = readDatabase();
    res.status(200).json(gyms);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read data' });
  }
});

app.get('/games/:id', (req, res) => {
  const { id } = req.params;
  const gyms = readDatabase();
  const gym = gyms.find(g => g.id === id);
  if (gym) {
    res.status(200).json(gym);
  } else {
    res.status(404).json({ error: 'Gym not found' });
  }
});

app.post('/games', (req, res) => {
  const { name, rating } = req.body;
  const gyms = readDatabase();

  const id = (gyms.length + 1).toString();
  const createdAt = new Date().toISOString();

  const newGym = { id, name, rating, createdAt };
  gyms.push(newGym);

  writeDatabase(gyms);
  res.status(201).json(newGym);
});

app.put('/games/:id', (req, res) => {
  const { id } = req.params;
  const { name, rating } = req.body;
  const gyms = readDatabase();

  const index = gyms.findIndex(g => g.id === id);
  if (index !== -1) {
    gyms[index] = { ...gyms[index], name, rating };
    writeDatabase(gyms);
    res.status(200).json(gyms[index]);
  } else {
    res.status(404).json({ error: 'Gym not found' });
  }
});

app.patch('/games/:id', (req, res) => {
  const { id } = req.params;
  const gyms = readDatabase();

  const gym = gyms.find(g => g.id === id);
  if (gym) {
    gym.rating = (gym.rating - 0.1).toFixed(1);
    writeDatabase(gyms);
    res.status(200).json(gym);
  } else {
    res.status(404).json({ error: 'Gym not found' });
  }
});

app.delete('/games/:id', (req, res) => {
  const { id } = req.params;
  const gyms = readDatabase();

  const index = gyms.findIndex(g => g.id === id);
  if (index !== -1) {
    gyms.splice(index, 1);
    writeDatabase(gyms);
    res.status(200).json({ message: 'Gym deleted' });
  } else {
    res.status(404).json({ error: 'Gym not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});