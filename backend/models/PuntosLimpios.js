const mongoose = require("mongoose");

const puntoLimpioSchema = new mongoose.Schema(
  {
    nombre: { type: String },
    direccion: { type: String },
    horario: { type: String },
    codigoPostal: { type: String },
    distrito: { type: String },
    lat: { type: Number },
    lng: { type: Number },
    materialesAceptados: [{ type: String }],
    estado: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("PuntoLimpio", puntoLimpioSchema, "punto_limpio");