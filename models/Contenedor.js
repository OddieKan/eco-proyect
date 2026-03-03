const mongoose = Require("mongoose");

const contenedorSchema = new moongose.Schema({
    tipo: {
        type: String,
        required: true
    },
    color: {
        type:String,
        required:true
    },
    residuosPermitidos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Residuo"
    }
    ]
},
    {timestamps:true}
);
module.exports = mongoose.model("Conteneedor", contenedorSchema);