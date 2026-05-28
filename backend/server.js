const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors({
  origin: 'https://eco-proyect-liard.vercel.app'
}));
app.use(express.json()); // Permite que el servidor entienda JSON (necesario para el registro)

// --- CONEXIÓN A MONGODB ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB conectado correctamente"))
  .catch(err => console.log("Error de conexión:", err));

// --- RUTAS (Endpoints) ---

// 1. Ruta de bienvenida (opcional para chequear estado)
app.get("/", (req, res) => res.send("EcoPoint API v1.0 - Funcionando"));

// 2. Rutas de Contenedores (Aceite, Ropa, Pilas)
const contenedoresRoutes = require("./routes/contenedores.js");
app.use("/api/contenedores", contenedoresRoutes);

// 3. Rutas de Usuarios (Registro, Login)
const usuariosRoutes = require("./routes/user.js");
app.use("/api/usuarios", usuariosRoutes);

// 4. Rutas de Recogidas (Si las sigues usando)
const recogidasRoutes = require("./routes/recogidas.js");
app.use("/api/recogidas", recogidasRoutes);

const puntosRoutes = require("./routes/puntosLimpios");
app.use("/api/puntos-limpios", puntosRoutes);

// --- INICIO DEL SERVIDOR ---
const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor real escuchando en http://localhost:${PORT}`);
});
 