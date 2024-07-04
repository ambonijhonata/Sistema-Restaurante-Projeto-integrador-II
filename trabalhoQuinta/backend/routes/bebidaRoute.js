import express  from "express";
import bebidaController from "../Api/Controller/bebidaController.js";



const router = express.Router()

router
    .get('/bebidas', bebidaController.listarbebida)
    .get('/bebidas/:id', bebidaController.listarbebidaPorId)   
    .post('/bebidas', bebidaController.criarbebida)
    .put('/bebidas/:id', bebidaController.Atualizarbebida)
    .delete('/bebidas/:id', bebidaController.excluirbebida)

export default router