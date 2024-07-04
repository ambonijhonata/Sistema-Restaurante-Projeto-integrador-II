import mongoose from 'mongoose';
import produto from './produto.js'
import bebida from './bebida.js'
import combo from './combo.js'

const comandaSchema = new mongoose.Schema({
        mesa: { type: Number, required: true },
        cliente: 
        [
            {
                nome: { type: String, required: true },
                produtos: [{ type: produto.schema }],
                bebidas: [{ type: bebida.schema }],
                combos: [{ type: combo.schema }],
                comentarios: [{ type: String }]
            }
        ] 
});


const Comanda = mongoose.model('Comanda', comandaSchema);

export default Comanda;