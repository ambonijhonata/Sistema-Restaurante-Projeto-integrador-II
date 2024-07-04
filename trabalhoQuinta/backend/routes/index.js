import express from "express";
import produto from './produtoRoute.js'
import comanda from './comandaRoute.js'
import bebida from './bebidaRoute.js'
import combo from './comboRoute.js'
import usuario from "./usuarioRoute.js";


const routes = (app) => {
    app.route('/').get((req,res) => {
        res.status(200).send({titulo: "funcionando"})
    })

    app.use(
        express.json(),
        produto,
        comanda,
        bebida,
        combo,
        usuario
    )
}

export default routes