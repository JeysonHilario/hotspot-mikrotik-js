function showSuccessMessage(status, statusText) {
  Swal.fire({
    //title: status,
    text: statusText,
    icon: status,
    confirmButtonText: "OK",
    confirmButtonColor: "#004aad",
    timer: 5000, // Fecha automaticamente após 3 segundos
    customClass: {
      popup: "swal-mobile"
    },
    showClass: {
      popup: "animate__animated animate__fadeInDown"
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp"
    }
  }).then(() => {
    if(status === "success"){
      window.location.href = "https://www.hilinkprovedor.com.br"; // Redirecionamento após o OK
    }else{
      window.location.reload();
    }
  });
}

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault(); 

  const nameClient   = document.querySelector("input[name='nameClient']").value;
  const telClient    = document.querySelector("input[name='telClient']").value;
  const cpfClient    = document.querySelector("input[name='cpfClient']").value;
  const macClient    = document.querySelector("input[name='macClient']").value;
  const urlServer    = "http://192.168.17.109:3000/api/validation";

  fetch(urlServer, { 
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ nameClient, telClient, cpfClient, macClient })
  })
    .then(response => response.json())
    .then(data => {
      //alert("Resposta do servidor: " + JSON.stringify(data));
      if(data.success){
        showSuccessMessage(Object.keys(data)[0],data.success);
      }else{
        showSuccessMessage(Object.keys(data)[0],data.error);
      }

    })
    .catch(error => console.error("Erro ao enviar:", error));
});

