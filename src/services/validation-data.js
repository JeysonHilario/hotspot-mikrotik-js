import * as validate from "./validate-input-data.js" 
import { validateIsClient } from "./valid-client-sgp.js";

export async function validationData(request_body){
  
  // VALIDA OS DADOS DO FORMULARIO SE EXISTEM E DEPOIS ENVIA PARA A SERVICE DE VALIDAÇÃO SE SAO REALMENTE VALIDAS
  // SE O NOME TEM UMA QUANTIDADE OK DE CARACTERES DE UM NOME REAL E SE O TELEFONE ESTA NO FORMATO CERTO NAO ACEITANDO NUMEROS ALEATORIOS
  // NO CPF VALIDA SE REALMENTE É VALIDO POR UMA EXPRESSAO UTILIZADA PARA VALIDAR CPFS
  // DEPOIS RETORNA UM OBJETO COM UMA PROPIEDADE ERROR OU SUCCESS COM SUA MENSAGEM DE STATUS.

  const { nameClient, telClient, cpfClient } = request_body;
  if( nameClient && telClient ){
    
    if( ! await validate.name( nameClient )){
      return { error: "Informe Seu nome completo MIN: 10 Caracteres" }; 
    }
    
    if( ! await validate.tel( telClient )){
      return { error: "Número de telefone inválido! Use o formato (99) 99999-9999" };
    } 
    
    return { success: "Dados recebidos com sucesso. A HiLink Agradece !" }

  }
  else if( cpfClient ){
      
    if ( ! await validate.cpf( cpfClient )) {
      return { error: "CPF inválido! Verifique e tente novamente." };
    }
    
    if( await validateIsClient(request_body.cpfClient) === " Ativo " ){
      return { success: "Dados recebidos com sucesso. A HiLink Agradece !" }
    }else{
      return { error: "Dados recebidos com sucesso. Mais seu CPF nao está em nosso banco de dados !" }
    }
  }
  else{
    return { error: "Dados Incompletos"};
  }
  
}


