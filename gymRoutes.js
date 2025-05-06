const express = require('express');
const { getGyms, getGymById, createGym, updateGym, patchGymRating, deleteGym } = require('../controllers/gymController');

const router = express.Router();

router.get('/games', getGyms);
router.get('/games/:id', getGymById);
router.post('/games', createGym);
router.put('/games/:id', updateGym);
router.patch('/games/:id', patchGymRating);
router.delete('/games/:id', deleteGym);

module.exports = router;
