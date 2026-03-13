const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const { default: mongoose } = require('mongoose');

// 1. Registro (Ahora la URL será: /api/usuarios/registro)
router.post('/registro', async (req, res) => {
    try {
        // Extraemos email para comprobar si existe antes de guardar
        const { email } = req.body;
        const existe = await User.findOne({ email });
        if (existe) return res.status(400).json({ error: "El email ya está registrado" });

        const nuevoUsuario = new User(req.body);
        await nuevoUsuario.save();
        res.status(201).json({ msg: "Usuario creado con éxito", usuario: nuevoUsuario });
    } catch (error){
        res.status(400).json({ error: error.message });
    }
});

// 2. Consultar todos (URL: /api/usuarios/)
router.get('/', async (req, res)=> {
    try {
        const usuarios = await User.find().select('-password'); 
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
});

module.exports = router;