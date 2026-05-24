const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

// 1. REGISTRO
router.post('/registro', async (req, res) => {
    try {
        const { email, password, nombre, apellido } = req.body;

        const existe = await User.findOne({ email });
        if (existe) {
            return res.status(400).json({ error: "El email ya está registrado" });
        }

        //ENCRIPTAR CONTRASEÑA
        const hashedPassword = await bcrypt.hash(password, 10);

        const nuevoUsuario = new User({
            nombre,
            apellido,
            email,
            password: hashedPassword
        });

        await nuevoUsuario.save();

        res.status(201).json({ msg: "Usuario creado con éxito" });

    } catch (error){
        res.status(400).json({ error: error.message });
    }
});



router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }


        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRETT || "secreto_provisional",
            { expiresIn: "24h" }
        );

        res.json({ msg: "Login correcto" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// 3. CONSULTAR USUARIOS
router.get('/', async (req, res)=> {
    try {
        const usuarios = await User.find().select('-password'); 
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
});

module.exports = router;