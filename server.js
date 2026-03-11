// archivo principal del backend 
const express = require("express");
const mongoose = require("mongoose");
const cors= require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// conectar rutas
const recogidasRoutes = require("./routes/recogidas.js");
app.use("/api/recogidas", recogidasRoutes);
//nueva ruta aceite, pilas, rppa.
const contenedoresRoutes = require("./routes/contenedores.js");
app.use("/api/contenedores", contenedoresRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB conectado"))
.catch(err => console.log("Error:", err));

app.get("/", (req, res) => 
  res.send("ECOPOINT API FUNCIONANDO")
);

app.listen(5000, () => 
  console.log("Servidor en puerto 5000")
);

 