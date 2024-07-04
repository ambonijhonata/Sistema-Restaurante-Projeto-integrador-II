import db from './Api/Config/dbConnect.js';
import express from 'express';
import routes from "./routes/index.js";
import cors from 'cors';

db.on("error", console.log.bind(console, 'erro de conexao'))
db.once("open", () => {
    console.log('o banco esta funcionando')
})

const app = express();

app.use(express.json())
app.use(cors())
app.use(function(req, res, next){ //
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
   }); //

routes(app);


export default app; 