import { validationData } from "../services/validation-data.js";
import { createUserMK } from "../services/create-user-mk.js"; 
import { saveData } from "../data/save-db.js";
import { returnDataBase } from "../data/return-data.js";
import { returnDate } from "../utils/utils.js";

export async function hotspotControlValidation(request_body){
  // RECEBE E ENVIA O REQUEST BODY PARA OS SERVICES DE VALIDAÇÃO QUE RETORNA UM OBJETO DE SUCCESS OU ERROR COM SUA MENSAGEM DE STATUS
  // SE FOR SUCESSO ENVIA O MAC PARA O SERVICE DE CRIAÇÃO DE USUARIO NO MIKROTIK CASO CONTRATIO ENVIA UMA MENSAGEM DE ERRO QUE SERA ENVIADA PARA O FRONT END
  const responseServer = await validationData(request_body);
  
  if( responseServer.success ){
    
    const data = {
      "Data":             await returnDate(),
      "Nome Completo":    request_body.nameClient,
      "Telefone Cliente": request_body.telClient,
      "Cpf Cliente":      request_body.cpfClient,
      "MAC":              request_body.macClient
    };
    createUserMK(request_body.macClient);
    saveData(data);
    return responseServer;
  }
  if( responseServer.error ){
    return responseServer;
  }
}

export async function hotspotControlGetData(){
  return await returnDataBase();
}
