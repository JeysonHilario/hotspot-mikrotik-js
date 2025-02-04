import axios from "axios";
import { logToFile } from "./log.js";
import https from "https";
//curl -k -u jeyson:12EWX8qc -X PUT http://mikrotik.hilario.com.br/rest/ip/hotspot/user --data '{"name": "jeyson", "password": "testeapi"}' -H "content-type: application/json"

const auth = {
  username: "jeyson",
  password: "12EWX8qc"
};
const headers = {
    'Content-Type': 'application/json'
  }
const agent = new https.Agent({  
  rejectUnauthorized: false, // Desativa a verificação do certificado
});

const config = {
  headers,
  auth,
  httpsAgent:agent
}

console.log(config)
const urlRestCreateUser = "https://mikrotik.hilario.com.br/rest/ip/hotspot/user";
const urlRestRunScript  = "https://mikrotik.hilario.com.br/rest/system/script/run";
const data = {
  name: "",
  'mac-address': "",
  profile: "profile-hilink",
};

const script = {
  '.id': "HOTSPOT-HOST-UPDATE"
}
//getClientMAC(){
  //
//}

export async function createUserMK(mac){

  data["name"]=mac;
  data["mac-address"]=mac;
 
  try {
    const responsePUT = await axios.put(urlRestCreateUser,data,config)
    console.log(responsePUT)
    console.log("kjhsadjkhaskj")
    if (responsePUT.data.error) {
      //console.error("Erro na API Mikrotik :", responsePUT.data.error);
      logToFile("ERROR-CRITICAL" ,`${responsePUT.data.error}`);
      
    }
  } catch (error) {
      //console.error(`Erro ao se comunicar com a API\nCode: ${error.response.data} Error: ${error.response.data.message}`);
    //console.log(error)  
    logToFile("ERROR-CRITICAL", `Code: ${error.response.data.error} | Error: ${error.response.data.message} | Detail Error: ${error.response.data.detail}`);
    return;
  }
  setTimeout(async () => {    
    try {
      const responsePOST = await axios.post(urlRestRunScript,script,headers);
      if (responsePOST.data.error) {
        //console.error("Erro na API Mikrotik :", responsePOST.data.error);
        logToFile( "ERROR-CRITICAL", `${responsePOST.data.error}`);

      }
    } catch (error) {
      //console.error(`Erro ao se comunicar com a API\nCode: ${error.response.data.error} Error: ${error.response.data.message}`);
      //logToFile(`Erro ao se comunicar com a API --- Code: ${error.response.data.error} Error: ${error.response.data.message}`,"ERROR-CRITICAL");
      logToFile("ERROR-CRITICAL", `Code: ${error.response.data.error} | Error: ${error.response.data.message} | Detail Error: ${error.response.data.detail}`);
      return;
    }
  }, 30000); 
}
