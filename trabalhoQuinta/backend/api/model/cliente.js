import mongoose from "mongoose";
import produto from './produto.js';
import bebida from './bebida.js';
import combo from './combo.js';

const clienteSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    produtos: [{ type: produto.schema }],
    bebidas: [{ type: bebida.schema }],
    combos: [{ type: combo.schema }],
    comentarios: [{ type: String }]
});

const Cliente = mongoose.model('Cliente', clienteSchema);

export default Cliente;