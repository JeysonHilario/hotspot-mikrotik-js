async function fetchDados() {
  try {
    const response = await fetch("http://localhost:3000/api/json", { 
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });

    const data = await response.json();
    return data; // Retorna diretamente os dados sem validação de sucesso ou erro
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
    return null;
  }
}

// Função para gerar as linhas da tabela
function gerarTabela(dados) {
  if (!Array.isArray(dados)) {
    console.error("Os dados não são um array válido:", dados);
    return;
  }

  const tbody = document.querySelector("#tabela tbody");
  tbody.innerHTML = ""; // Limpa a tabela antes de inserir novos dados

  dados.forEach(dado => {
    const tr = document.createElement("tr");

    const tdId = document.createElement("td");
    tdId.textContent = dado["Data"] || "--";

    const tdNome = document.createElement("td");
    tdNome.textContent = dado["Nome Completo"] || "--";

    const tdEmail = document.createElement("td");
    tdEmail.textContent = dado["Telefone Cliente"] || "--";

    const tdCPF = document.createElement("td");
    tdCPF.textContent = dado["Cpf Cliente"] || "--";

    const tdMAC = document.createElement("td");
    tdMAC.textContent = dado["MAC"] || "--";

    tr.appendChild(tdId);
    tr.appendChild(tdNome);
    tr.appendChild(tdEmail);
    tr.appendChild(tdCPF);
    tr.appendChild(tdMAC);

    tbody.appendChild(tr);
  });
}

// Chamar a função assíncrona e popular a tabela
async function carregarDadosNaTabela() {
  const dados = await fetchDados();
  
  //if (dados && Array.isArray(dados)) {  // Agora aceita qualquer JSON que seja um array
    gerarTabela(dados);
  //} else {
   // console.error("Os dados retornados não contêm um array válido.");
  //}
}

// Executa a função para carregar os dados na tabela
carregarDadosNaTabela();

