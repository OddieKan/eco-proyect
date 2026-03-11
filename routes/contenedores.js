const express =require('express');
const router =express.Router();
const Contenedor =require('../models/Contenedor');
// GET /api/contenedores/buscar?distrito=Retiro
router.get('/buscar', async (req, res) => {
  try {
    const { distrito } = req.query; // Capturamos el distrito de la URL [cite: 196]
    
    // Buscamos contenedores que tengan ese distrito y que tengan coordenadas
    const puntos = await Contenedor.find({ 
      distrito: { $regex: distrito, $options: 'i' },
      lat: { $exists: true } // Solo queremos las ubicaciones, no las definiciones generales
    });
    
    res.json(puntos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports=router;