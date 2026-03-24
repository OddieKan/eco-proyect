const mongoose = require("mongoose");

const recogidaMunicipalSchema = new mongoose.Schema(
    {
        zona:{
            type:String,
            required:true
        },
        dia: {
            type:String,
            required: true
        },
        tipoResiduo:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Residuo",
            required:true
        }
    },
    { timestamps: true}
);

module.exports = mongoose.model("RecogidaMunicipal", recogidaMunicipalSchema);