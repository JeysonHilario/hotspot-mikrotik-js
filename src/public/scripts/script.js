
let currentPage = 1;
let rowsPerPage = 30;
let allData = [];
const PORT = 3000;

async function fetchData() {

  try {
    const response = await fetch(`http://localhost:${PORT}/api/json`, { 
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });

    const data = await response.json();
    return Array.isArray(data) ? data : []; 
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
    return [];
  }
}

function displayTable( data, page = 1 ) {
  
  const tbody = document.querySelector("#table tbody");
  tbody.innerHTML = "";
  if(page !== "all" ){ 
    const start = ( page - 1 ) * rowsPerPage;
    const end   = start + rowsPerPage;
    const paginatedData = data.slice( start, end );
    paginatedData.forEach(dado => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${dado["Data"] || "--"}</td>
        <td>${dado["Nome Completo"] || "--"}</td>
        <td>${dado["Telefone Cliente"] || "--"}</td>
        <td>${dado["Cpf Cliente"] || "--"}</td>
        <td>${dado["MAC"] || "--"}</td>
        `;
      
      tbody.appendChild(tr);
  });
  }else{
    rowsPerPage = allData.length
    data.forEach(dado => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${dado["Data"] || "--"}</td>
        <td>${dado["Nome Completo"] || "--"}</td>
        <td>${dado["Telefone Cliente"] || "--"}</td>
        <td>${dado["Cpf Cliente"] || "--"}</td>
        <td>${dado["MAC"] || "--"}</td>
        `;
      
      tbody.appendChild(tr);
    });
  };
  updateVisualization();

}

function updateVisualization(){
  
  const totalPages = Math.ceil( allData.length / rowsPerPage );
  const paginationDiv = document.querySelector("#pagination");
  paginationDiv.innerHTML = "";

  if( totalPages > 1 ){
    const prevButton = document.createElement("button");
    prevButton.textContent = "Anterior";
    prevButton.disabled = currentPage === 1;
    prevButton.onclick = () => changePage( currentPage - 1 );
    paginationDiv.appendChild(prevButton);
  }

  for( let i = 1; i <= totalPages; i++ ){
    const pageButton = document.createElement("button");
    pageButton.textContent = i;
    pageButton.className = currentPage === i ? "active" : "";
    pageButton.onclick = () => changePage( i );
    paginationDiv.appendChild( pageButton );
  }

  const nextButton = document.createElement("button");
  nextButton.textContent = "Proximo";
  nextButton.disabled = currentPage === totalPages;
  nextButton.onclick = () => changePage( currentPage + 1 );
  paginationDiv.appendChild(nextButton);
}

function changePage( page ){
  if ( page < 1 || page > Math.ceil( allData.length / rowsPerPage )) return;
  currentPage = page;
  displayTable(allData , currentPage);

}

function printPage(){
  const table = document.querySelector("#table"); // Seleciona apenas a tabela

  if (!table) {
    console.error("Tabela não encontrada!");
    return;
  }

  const printWindow = window.open("", "", "width=800,height=600");
  printWindow.document.write(`
    <html>
      <head>
        <title>Impressão</title>
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 2px solid black;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        ${table.outerHTML} <!-- Apenas a tabela será impressa -->
        <script>
          window.onload = function() {
            window.print();
            window.close();
          };
        </script>
      </body>
    </html>
  `);

}

async function loadDataTable(){
  allData = await fetchData();
  currentPage = 1;
  displayTable(allData , currentPage)

}

document.querySelector("#rowsPerPage").addEventListener("change", function() {
  if(this.value === "all"){
    displayTable(allData, this.value)
    updateVisualization();
    return
  }
  rowsPerPage = parseInt(this.value);
  currentPage = 1;
  displayTable(allData, currentPage);
  updateVisualization();
});

document.querySelector("#printButton").addEventListener("click", printPage);
document.querySelector("#excludeDBButton").addEventListener("click", function(){
  console.log("Excluida")
});
loadDataTable();

