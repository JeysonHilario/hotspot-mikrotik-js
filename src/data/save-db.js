import fs from "fs";
import { logToFile } from "../utils/log.js";

export async function saveData(DB) {
  
  const line = `${JSON.stringify(DB)}\n`;

  fs.appendFile('DB.json', line, (err) => {
      if (err) {
        //console.error('Erro ao gravar no arquivo:', err);
        logToFile("DB-ERROR",`Erro ao gravar no arquivo:', ${err}`);
      } else {
        //console.log('Dados gravados com sucesso!');
        logToFile("DB-SUCCESS",'Dados gravados com sucesso!');
      }
  });

}

