
let currentPage = 1;
let rowsPerPage = 10;
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
  const start = ( page - 1 ) * rowsPerPage;
  const end   = start + rowsPerPage;
  const paginatedData = data.slice( start, end );
  console.log(start)
  console.log(end)
  console.log(paginatedData)

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
  window.print();
}

async function loadDataTable(){
  allData = await fetchData();
  currentPage = 1;
  displayTable(allData , currentPage)

}

document.querySelector("#rowsPerPage").addEventListener("change", function() {
  rowsPerPage = parseInt(this.value);
  currentPage = 1;
  displayTable(allData, currentPage);
  updateVisualization();
});

document.querySelector("#printButton").addEventListener("click", printPage);
loadDataTable();

