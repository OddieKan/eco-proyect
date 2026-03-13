const mongoose = require("mongoose");

const DiaSchema = new mongoose.Schema({
  semana: Number,
  dia: String,
  mes: String
}, { _id: false });

const RecogidaSchema = new mongoose.Schema({
  tipo: { type: String, default: "Muebles" },
  distrito: String,
  codigoDistrito: String,
  codigoBarrio: String,
  zona: String,
  diasRecogida: [DiaSchema],
  horario: String
});

module.exports = mongoose.model("Recogida", RecogidaSchema);
