const express =require('express');
const router =express.Router();
const Contenedor =require('../models/Contenedor');
// GET /api/contenedores/buscar?distrito=Retiro
router.get('/buscar', async (req, res) => {
  try {
    const { distrito } = req.query; // Capturamos el distrito de la URL [cite: 196]
    let filtro = {};
    // Solo aplicamos el regex si 'distrito' tiene contenido
    if (distrito) {
      filtro = { direccion: { $regex: distrito, $options: 'i' } };
    }
    // Buscamos con el filtro (que estará vacío si no hay distrito)
    const puntos = await Contenedor.find(filtro).limit(50);
    
    res.json(puntos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports=router;
