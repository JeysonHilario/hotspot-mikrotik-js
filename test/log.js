import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { returnDate } from "./index.js"

const __filename = fileURLToPath(import.meta.url); 
const __dirname  = path.dirname(__filename);


export async function logToFile(severity, message){

  const date = await returnDate();
  const logMessage = `[${date}] [${severity}] ${message}\n`;
  const pathFilePath = path.join(__dirname, 'app.log');

  fs.appendFile(pathFilePath, logMessage,(err) =>{
    if(err){
      console.log("Erro ao Gravar Arquivo de Log", err);
    }
  })
}
