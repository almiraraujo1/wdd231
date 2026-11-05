// Ano atual
const anoAtual = document.querySelector("#anoAtual");
const hoje = new Date();                   
anoAtual.textContent = hoje.getFullYear(); 

// Última modificação do documento
const ultimaModificacao = document.getElementById("ultimaModificacao");
ultimaModificacao.innerHTML = "Última Modificação: " + document.lastModified;
