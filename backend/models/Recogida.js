const mongoose = require("mongoose");

const RecogidaSchema = new mongoose.Schema({
  tipo: { type: String, default: "Muebles" },
  descripcion: String,
  distrito: String,
  zona: String,
  diasRecogida: [String],
  horario: String,
  codigoPostal: String, 
  instrucciones: String,
  citaPrevia: { type: Boolean, default: false }
});

module.exports = mongoose.model("Recogida", RecogidaSchema, "recogidas_municipales");
