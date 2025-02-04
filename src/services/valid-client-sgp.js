import axios from "axios"
import dontenv from "dotenv";
import * as CODE from "../utils/log-status-codes.js";
import { logToFile } from "../utils/log.js";
dontenv.config()

export async function validateIsClient( cpfClient ){ 
  // CONFIGURA VARIAVEIS ESSENCIAIS PARA FAZER A REQUISIÇÃO NO SGP
  // DEPOIS DA REQUISIÇÃO É VERIFICADO SE NO RETORNO DA REQUISIÇÃO HÁ UM CONTRATO ATIVO
  // SE SIM VAI SER RETORNADO UM ' Ativo ' QUE SERA TRATATO NO VALIDATION DATA
  const headers = {
    headers:{
    'Content-Type': 'application/json'
    }
  };

  const body = {
    token: process.env.SGP_TOKEN,
    app: process.env.SGP_APP,
    cpfcnpj: cpfClient
  };

  try {
    const response = await axios.post( process.env.SGP_URL, body, headers )
    if ( response.data.error ) {
      //console.error("Erro na API Mikrotik :", responsePUT.data.error);
      logToFile( CODE.SGP_FAIL,`${response.data.error}` );  
      return;
    }
    if (!response.data.contratos || response.data.contratos.length === 0) {
      return;
    }
    const contratoStatus = response.data.contratos[0].contratoStatusDisplay; 
    logToFile( CODE.SGP_SUCCESS , `Status: Client contract is valid`);
    return contratoStatus;

  } catch( error ) {
    //console.error(`Erro ao se comunicar com a API\nCode: ${error.response.data.error} Error: ${error.response.data.message}`);
    logToFile( CODE.SGP_FAIL, `Code: ${error.response.data.error} | Error: ${error.response.data.message} | Detail Error: ${error.response.data.detail}`);
    return;
  }
}
