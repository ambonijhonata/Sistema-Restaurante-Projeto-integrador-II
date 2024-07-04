import mongoose, { SchemaTypes } from "mongoose";

const comboSchema = new mongoose.Schema(
    [ 
        {
        id: {type: SchemaTypes.ObjectId},
        combo: {type: String},
        valor: {type: Number}    
        }
    ]
)

const combo = mongoose.model('combos', comboSchema)

export default combo