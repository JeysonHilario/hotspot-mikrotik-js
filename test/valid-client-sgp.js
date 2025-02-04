import axios from "axios"

const url   = "https://hilink.sgp.net.br/api/ura/consultacliente/"
const token = "8b036013-93d4-4c32-885e-74311df91ab2"
const app   = "mikrotik"
const cpf   = "088.948.554-22"

const headers = {
    headers:{
    'Content-Type': 'application/json'
  }
};

const body = {
  token: token,
  app: app,
  cpfcnpj: cpf
}

const response = await axios.post(url,body,headers)
console.log(response.data.contratos[0].contratoStatusDisplay)
