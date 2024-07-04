import mongoose, { SchemaTypes } from "mongoose";

const usuarioSchema = new mongoose.Schema(
    [ 
        {
        id: {type: SchemaTypes.ObjectId},
        login: {type: String},
        pass: {type: String}    
        }
    ]
)

const usuario = mongoose.model('usuarios', usuarioSchema)

export default usuario 