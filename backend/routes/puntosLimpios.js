const express = require('express');
const router = express.Router();
const PuntoLimpio = require('../models/PuntosLimpios');

// GET /api/puntos-limpios?cp=28007
router.get('/', async (req, res) => {
  try {
    const { cp } = req.query;

    const puntos = await PuntoLimpio.find({
      codigoPostal: cp
    });

    res.json(puntos);
  } catch (error) {
    console.log("ERROR PUNTOS LIMPIOS:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;