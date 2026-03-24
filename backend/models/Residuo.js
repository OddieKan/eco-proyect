const mongoose = require("mongoose");
const residuoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required:true,
        trim:true
    },
    categoria:{
        type: String,
        required:true
    },
    contenedor: {
        type: String,
        required:true
    },
    consejos:{
        type: String,
        default: ""
    },

    creadoPorUsuario: {
        type:Boolean,
        default: false    }
},
    {
    timestamps:true

});

module.exports = mongoose.model("Residuo", residuoSchema, "residuos");