// Atenção: Esse arquivo serve para todas as páginas da Câmara!

// ----- Menu de Celular -----
// Pega o botão e o menu do HTML
const botaoMenu = document.querySelector("#menu-botao");
const menu = document.querySelector("#menu-principal");

// Quando clicar no botão, abre ou fecha o menu
botaoMenu.addEventListener("click", () => {
  // toggle coloca a classe "aberto" se não tiver, e tira se já tiver
  const estaAberto = menu.classList.toggle("aberto");

  // Atualizo o botão (acessibilidade e o desenho do botão)
  botaoMenu.setAttribute("aria-expanded", estaAberto);
  botaoMenu.textContent = estaAberto ? "✕" : "☰";
});

// ----- Rodapé -----
// Ano atual
const anoAtual = new Date().getFullYear();
document.querySelector("#ano").textContent = anoAtual;

// Última modificação do documento
document.querySelector("#ultima-modificacao").textContent = document.lastModified;
