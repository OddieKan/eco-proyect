const mongoose = require("mongoose");

const historialBusquedaSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    termino: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("HistorialBusqueda", historialBusquedaSchema);
