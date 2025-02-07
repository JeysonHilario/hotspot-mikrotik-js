import fs from "fs";
import { logToFile } from "../utils/log.js";

export async function saveData(dataUser) {
  const line = dataUser; 
  fs.readFile( 'DB.json' , 'utf8',async ( err, fileData ) => {
    if ( err ) {
        console.error( 'Erro ao ler o arquivo:', err );
        return;
    }  
    try {
      let jsonArray = await JSON.parse( fileData );

      jsonArray.push(line);

      fs.writeFile('DB.json', JSON.stringify( jsonArray, null, 4 ), ( err ) => {
        if (err) {
          //console.error('Erro ao gravar no arquivo:', err);
          logToFile("DB-ERROR",`Erro ao gravar no arquivo:', ${err}`);
        } else {
          //console.log('Dados gravados com sucesso!');
          logToFile("DB-SUCCESS",'Dados gravados com sucesso!');
        }
      });
    } catch (error) {
      console.error('Erro ao processar JSON:', error); 
    }
  });
};
