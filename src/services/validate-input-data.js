export async function name(nameClient){
    
  const nameClientRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{10,50}$/;
  if (!nameClientRegex.test(nameClient)){
    return false;
  }
  return true;

}

export async function tel(telClient){
  
  const telefoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/;
  if (!telefoneRegex.test(telClient)) {
    return false;
  }
  return true;
}

export async function cpf(cpfClient) {
  
  const cpfRegex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;

  if (!cpfRegex.test(cpfClient)) {
    return false;
  }
  
  const cpf = cpfClient.replace(/\D/g, "");

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false; // Rejeita CPFs com todos os números iguais (ex: 111.111.111-11)
  }

  let sum = 0, remainder;

  for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(10))) return false;

  return true;
}

