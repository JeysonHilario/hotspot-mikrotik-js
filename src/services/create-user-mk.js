import axios from "axios";
import dontenv from "dotenv";
import https from "https";
import { ROUTES_MK_API } from "../utils/routes.js";
import { HOTSPOT_HOST_UPDATE, PAYLOAD } from "../utils/hotspot-api-utils.js";
import { logToFile } from "../utils/log.js";
import * as CODE from "../utils/log-status-codes.js";
dontenv.config();


export async function createUserMK(mac){
  // CONFIGURA AS VARIAVEIS ESSENCIAIS PARA A REQUISIÇÃO NA API MIKROTIK. O USO DA VARIAVEL AGENT É APENAS EM TESTES PARA ACEITAR CERTIFICADOS NAO VALIDADOS.
  // A REQUISIÇÃO PUT NA API MIKROTIK CRIA O USUARIO NA ABA IP/HOTSPOT/USER SE TIVER ALGUM ERRO NA APLICAÇÃO SERA GRAVADA NO LOG.
  // A REQUISIÇÃO POST EXECUTA UM SCRIPT PARA RETIRAR O USUARIO DA ABA HOSTS PARA A ABA ACTIVE NAO ESPERANDO O MIKROTIK FAZER ISSO AUTOMATICO.
  // O TIME OUT ESTA SETADO PARA O CLIENTE FICAR UM TEMPO NO SITE DA EMPRESA.
  const auth = {
      username: process.env.USERNAME,
      password: process.env.PASSWORD
  }
  const contentType = {
      'Content-Type': 'application/json'
  }
  const agent = new https.Agent({  
    rejectUnauthorized: false, // Desativa a verificação do certificado
  });

  const headers = {
    contentType,
    auth,
    httpsAgent: agent
  }

  const payload = PAYLOAD;
  payload["name"] = mac;
  payload["mac-address"] = mac;
 
  try {
    const responsePUT = await axios.put( ROUTES_MK_API.create_user, payload, headers )
    if ( responsePUT.data.error ) {
      //console.error("Erro na API Mikrotik :", responsePUT.data.error);
      logToFile( CODE.ERROR_CRITICAL,`${responsePUT.data.error}` );  
      return;
    }
  } catch( error ) {
    //console.error(`Erro ao se comunicar com a API\nCode: ${error.response.data.error} Error: ${error.response.data.message}`);
    logToFile( CODE.ERROR_CRITICAL, `Code: ${error.response.data.error} | Error: ${error.response.data.message} | Detail Error: ${error.response.data.detail}`);
    return;
  }
  setTimeout(async () => {    
    try {
      const responsePOST = await axios.post( ROUTES_MK_API.run_script, HOTSPOT_HOST_UPDATE, headers );
      if ( responsePOST.data.error ) {
        //console.error("Erro na API Mikrotik :", responsePOST.data.error);
        logToFile( CODE.ERROR_CRITICAL, `${response.data.error}`);
        return;
      }
    } catch ( error ) {
      //console.error(`Erro ao se comunicar com a API\nCode: ${error.response.data.error} Error: ${error.response.data.message}`);
      //logToFile(`Erro ao se comunicar com a API --- Code: ${error.response.data.error} Error: ${error.response.data.message}`,"ERROR-CRITICAL");
      logToFile( CODE.ERROR_CRITICAL, `Code: ${error.response.data.error} | Error: ${error.response.data.message} | Detail Error: ${error.response.data.detail}`);
      return;
    }
  }, 30000); 
}
