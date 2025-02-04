const contName = document.getElementById("name")
const contTel = document.getElementById("tel")
const contCpf = document.getElementById("cpf")

const btIsClient = document.getElementById("isClient");
const btBack = document.getElementById("back");

window.onload = function () {
  document.querySelector("form").reset();
};

btIsClient.addEventListener("click", function() {
  
  contName.style.display="none"
  document.querySelector("#name input").value=""
  contTel.style.display="none"
  document.querySelector("#tel input").value=""
  btIsClient.style.display="none"

  contCpf.style.display="block"
  btBack.style.display="block"
  
  
});

btBack.addEventListener("click", function(){
  
  btBack.style.display="none"
  contCpf.style.display="none"
  document.querySelector("#cpf input").value=""

  contName.style.display="block"
  contTel.style.display="block"
  btIsClient.style.display="block"

})
