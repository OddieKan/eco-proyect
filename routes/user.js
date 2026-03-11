//registro, login y ver puntos eco
const express = require('express');
const router = express.Router();
const User = require('../models/User.js');

//Crear (Registro)
router.post('/', async (req, res) => {
    try {
        const nuevoUsuario = new User(req.body);
        await nuevoUsuario.save();
        res.status(201).json(nuevoUsuario);
    } catch (error){
        res.status(400).json({ error: error.message });
    }
});

//consultarlos todos 
router.get('/', async (req, res)=> {
    try {
        const usuarios = await User.find().select('-password'); //se excluye conttaseña por seguridad. 
        res.json(usuarios);
    }catch (error) {
        res.status(500).json({ error: error.message});
    }
});