import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs"
import {createUserMK} from "./create-user-mk.js"
import { logToFile } from "./log.js"

const app = express();

const PORT = 3000;


// Middleware para interpretar os dados do POST
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rota para processar o POST do formulário
export async function returnDate(){
   const data = new Date(); // Cria um objeto Date com a data e hora atuais
    
    // Formata a data para o formato desejado: YYYY-MM-DD-HH:mm:ss
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Mes começa em 0, então somamos 1
    const dia = String(data.getDate()).padStart(2, '0');
    const hora = String(data.getHours()).padStart(2, '0');
    const minuto = String(data.getMinutes()).padStart(2, '0');
    const segundo = String(data.getSeconds()).padStart(2, '0');
    
    const dataFormatada = `${ano}-${mes}-${dia}-${hora}:${minuto}:${segundo}`;
    return dataFormatada;
}
function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, ""); // Remove pontos e traços

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false; // Rejeita CPFs com todos os números iguais (ex: 111.111.111-11)
    }

    let soma = 0, resto;

    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;

    return true; // CPF válido
}
function saveData(DB) {
     // Adiciona a data e hora ao registro
    const linha = `${JSON.stringify(DB)}\n`; // Formato de linha para adicionar no arquivo

    // O método appendFile irá adicionar a linha ao final do arquivo (sem sobrescrever)
    fs.appendFile('DB.json', linha, (err) => {
        if (err) {
          //console.error('Erro ao gravar no arquivo:', err);
          logToFile("DB-ERROR",`Erro ao gravar no arquivo:', ${err}`);
        } else {
          //console.log('Dados gravados com sucesso!');
          logToFile("DB-SUCCESS",'Dados gravados com sucesso!');
        }
    });
}

app.post("/enviar",async (req, res) => {
    
    let data = await  returnDate();
    const { nameClient, telClient, cpfClient, macClient } = req.body;
    console.log(req.body)
    const mac = macClient;
    let form = {};
    const nameClientRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{10,50}$/;
    const telefoneRegex     = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/;
    const cpfRegex          = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;

    if (nameClient && telClient){
      if (!nameClientRegex.test(nameClient)){
        return res.status(400).json({ error: "Informe Seu nome completo MIN: 10 Caracteres" });
      }
      if (!telefoneRegex.test(telClient)) {
        return res.status(400).json({ error: "Número de telefone inválido! Use o formato (99) 99999-9999" });
      }

      form = {
           "Data": data,
           "Nome Completo": nameClient,
           "Telefone Cliente": telClient,
           "MAC": mac
       };
    }else if(cpfClient){
      
      if (!cpfRegex.test(cpfClient) || !validarCPF(cpfClient)) {
          return res.status(400).json({ error: "CPF inválido! Verifique os números e tente novamente." });
      }
         form = {
             "Data": data,
             "Cpf Cliente": cpfClient,
             "MAC": mac 
        };
    }
    else{
      return res.status(400).json({ error: "Dados Incompletos"});
    }
    
    createUserMK(mac);
    //if(verifyClientSGP(cpfClient)){};
    saveData(form)
    return res.status(200).json({ success: "Dados recebidos com sucesso. A HiLink Agradece !" });

});
// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
