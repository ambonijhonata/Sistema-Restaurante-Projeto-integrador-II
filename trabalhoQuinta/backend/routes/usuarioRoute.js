import express  from "express";
import usuarioController from "../Api/Controller/usuarioController.js";



const router = express.Router()

router
    .get('/usuarios', usuarioController.listarusuario)
    .get('/usuarios/:id', usuarioController.listarusuarioPorId)   
    .post('/usuarios', usuarioController.criarusuario)
    .post('/login', usuarioController.fazerLogin)
    .put('/usuarios/:id', usuarioController.Atualizarusuario)
    .delete('/usuarios/:id', usuarioController.excluirusuario)

export default router