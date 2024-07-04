import mongoose, { SchemaTypes } from "mongoose";

const bebidaSchema = new mongoose.Schema(
    [ 
        {
        id: {type: SchemaTypes.ObjectId},
        produto: {type: String},
        categoria: {type: String},
        valor: {type: Number}    
        }
    ]
)

const bebida = mongoose.model('bebidas', bebidaSchema)

export default bebida 