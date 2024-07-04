import express  from "express";
import comandaController from "../Api/Controller/comandaController.js";



const router = express.Router()

router
    .get('/comandas', comandaController.listarcomanda)
    .get('/comandas/:mesa', comandaController.verificarSeExistePessoaNaComanda)   
    // .get('/comandas/:mesa/pedidos', comandaController.listaComandaMesa)
    .post('/comandas', comandaController.criarcomanda)
    .put('/comandas/:mesa', comandaController.Atualizarcomanda)
    .delete('/comandas/:id', comandaController.excluircomanda)


export default router