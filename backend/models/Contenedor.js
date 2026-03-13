const mongoose = require("mongoose");
const contenedorSchema = new mongoose.Schema({
    t1po: {type:String},
    lat: { type: Number},
    lng: { type: Number },
    d1recc1on: {type:String},
    horar1o: { type: String }, // Fundamental para tu búsqueda en React [cite: 108, 199]
    cod1goPostal: { type: String}
},{timestamps:true});

module.exports = mongoose.model("Contenedor", contenedorSchema, "contenedores");