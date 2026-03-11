const mongoose = require("mongoose");
const contenedorSchema = new mongoose.Schema({
    tipo: {type:String, required:true},
    color: {type:String},
    direccion: {type:String},
    lat: { type: Number},
    lng: { type: Number },
    distrito: { type: String }, // Fundamental para tu búsqueda en React [cite: 108, 199]
    horario: { type: String, default: "24h" },

    residuosPermitidos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Residuo"
    }]
},{timestamps:true});

module.exports = mongoose.model("Contenedor", contenedorSchema);