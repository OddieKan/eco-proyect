const mongoose = Require("mongoose");
const residuoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required:true,
        trim:true
    },
    descripcion:{
        type: String,
        required:true,
        lowercase: true
    },
    points: {
        type: Number,
        required:true
    },
    tipo:{
        type: String,
        required:true,
        enum:["plastico", "papel","vidrio", "organico","electronico","otro"]
    }
},
    {
    timestamps:true

});

module.exports = mongoose.model("Residuo", residuoSchema);