// archivo principal del backend 
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());

// conectar rutas
const recogidasRoutes = require("./routes/recogidas.js");
app.use("/api/recogidas", recogidasRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB conectado"))
.catch(err => console.log("Error:", err));

app.get("/", (req, res) => 
  res.send("ECOPOINT API FUNCIONANDO")
);

app.listen(5000, () => 
  console.log("Servidor en puerto 5000")
);

 