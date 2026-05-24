const mongoose = require("mongoose");

const puntosLimpiosSchema = new mongoose.Schema(
{
  nombre: { type: String, required: true },
  direccion: { type: String, required: true },
  horario: { type: String },

  codigoPostal: {
    type: String,
    required: true
  },

  residuosAceptados: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Residuo"
    }
  ]
},
{ timestamps: true }
);

module.exports = mongoose.model("PuntosLimpios", puntosLimpiosSchema, "punto_limpio");