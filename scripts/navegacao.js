const botaoMenu = document.querySelector("#botaoMenu");
const menu = document.querySelector("#menu");

// Função Ligada = Clique no Botão
function alternarMenu() {
  // classList.toggle liga a classe "aberto" se não tiver, e desliga se já tiver
  const estaAberto = menu.classList.toggle("aberto");

  // Troca do símbolo do botão: X = aberto, ☰ = fechado
  if (estaAberto) {
    botaoMenu.textContent = "✕";
    botaoMenu.setAttribute("aria-label", "Fechar menu");
  } else {
    botaoMenu.textContent = "☰";
    botaoMenu.setAttribute("aria-label", "Abrir menu");
  }

  botaoMenu.setAttribute("aria-expanded", estaAberto);
}

botaoMenu.addEventListener("click", alternarMenu);
