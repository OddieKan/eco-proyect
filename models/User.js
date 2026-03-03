const mongoose = Require("mongoose");
const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required:true,
        trim:true
    },
    email:{
        type: String,
        required:true,
        unique:true,
        lowercase: true
    },
    password: {
        type: String,
        required:true
    },
    puntosEco:{
        type: Number,
        default: 0
    }
},
    {
    timestamps:true

});

module.exports = mongoose.model("User", userSchema);