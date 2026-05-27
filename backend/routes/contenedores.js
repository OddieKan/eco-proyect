const express = require('express');
const router = express.Router();
const Contenedor = require('../models/Contenedor');
const Residuo = require('../models/Residuo');

// GET /api/contenedores/buscar?tipo=Pilas
router.get('/buscar', async (req, res) => {
  try {
    const { tipo } = req.query;
    let filtro = {};
    if (tipo) {
      filtro = { t1po: { $regex: tipo, $options: 'i' } };
    }
    const puntos = await Contenedor.find(filtro).limit(50);
    res.json(puntos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/contenedores/buscar-residuo?nombre=ropa
router.get('/buscar-residuo', async (req, res) => {
  try {
    const { nombre } = req.query;
    if (!nombre) return res.status(400).json({ error: 'Falta el parámetro nombre' });

    const residuos = await Residuo.find({
      nombre: { $regex: nombre, $options: 'i' }
    }).limit(10);

    res.json(residuos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;