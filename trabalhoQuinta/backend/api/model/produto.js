import mongoose, { SchemaTypes } from "mongoose";

const produtoSchema = new mongoose.Schema(
    [ 
        {
        id: {type: SchemaTypes.ObjectId},
        produto: {type: String},
        categoria: {type: String},
        valor: {type: Number}    
        }
    ]
)

const produto = mongoose.model('produtos', produtoSchema)

export default produto