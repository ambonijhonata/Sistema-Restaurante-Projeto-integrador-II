import express  from "express";
import comboController from "../Api/Controller/comboController.js";



const router = express.Router()

router
    .get('/combos', comboController.listarcombo)
    .get('/combos/:id', comboController.listarcomboPorId)   
    .post('/combos', comboController.criarcombo)
    .put('/combos/:id', comboController.Atualizarcombo)
    .delete('/combos/:id', comboController.excluircombo)

export default router