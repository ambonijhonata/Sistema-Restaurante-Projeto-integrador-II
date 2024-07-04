import express  from "express";
import produtoController from "../Api/Controller/produtoController.js";



const router = express.Router()

router
    .get('/produtos', produtoController.listarproduto)
    .get('/produtos/:id', produtoController.listarprodutoPorId)   
    .post('/produtos', produtoController.criarproduto)
    .put('/produtos/:id', produtoController.Atualizarproduto)
    .delete('/produtos/:id', produtoController.excluirproduto)

export default router