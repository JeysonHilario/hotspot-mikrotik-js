import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { hotspotControlValidation, hotspotControlGetData } from "./controller/controller.js";
export const app = express()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// ROTA POST PARA ENVIAR DADOS DO FORMULARIO PARA VALIDAÇÃO
app.post("/api/validation",async (req, res) => {
    
  const responseControl = await hotspotControlValidation(req.body);
  res.status(200).json(responseControl);

});

app.get("/api/json",async (req, res) => {
  const responseControl = await hotspotControlGetData();
  res.status(200).json(responseControl);
});
