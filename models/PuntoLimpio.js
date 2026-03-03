const mongoose = Require("mongoose");

const puntoLimpioSchema = new mongoose.Schema(
    {
        nombre:{
            type:String,
            required:true
        },
        direccion:{
            type:String,
            required:true
        },
        horario:{
            type:String
        },
        residuosAceptados:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref: "Residuo"
            }
        ]

    },
    { timestamps: true }
);

module.exports = mongoose.model("PuntoLimpio", puntoLimpioSchema);