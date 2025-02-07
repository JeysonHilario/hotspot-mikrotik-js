import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { hotspotControlValidation, hotspotControlGetData, hotspotControlGetIndexHTML } from "./controller/controller.js";
export const app = express()
const __dirname = path.resolve();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));


// ROTA POST PARA ENVIAR DADOS DO FORMULARIO PARA VALIDAÇÃO
app.post("/api/validation",async ( req, res ) => {
    
  const responseControl = await hotspotControlValidation(req.body);
  res.status(200).json(responseControl);

});

app.get("/api/json",async ( req, res ) => {

  const responseControl = await hotspotControlGetData();
  res.status(200).json(responseControl);

});

app.get("/getUsers", async ( req, res ) => {

  const responseControl = await hotspotControlGetIndexHTML();  
  res.status(200).send(responseControl);

});
