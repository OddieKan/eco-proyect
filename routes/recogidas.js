const express = require('express');
const router = express.Router();
const Recogida = require('../models/Recogida.js');

// get todas las recogidas 
// GET /api/recogidas
router.get('/', async (req, res) => {
  try {
    const recogidas = await Recogida.find();
    res.json(recogidas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/recogidas/:id
router.get('/:id', async (req, res) => {
  try {
    const recogida = await Recogida.findById(req.params.id);
    res.json(recogida);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//post crear una nueva

router.post('/', async (req, res) => {
  try {
    const nuevaRecogida = new Recogida(req.body);
    await nuevaRecogida.save();
    res.status(201).json(nuevaRecogida);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//delete 
router.delete('/:id', async (req, res) => {
  try {
    await Recogida.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Recogida eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;