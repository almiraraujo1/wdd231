// Esse arquivo só é usado na página de associação (associacao.html)

// ----- Data e hora no campo oculto -----
// pego o campo escondido do formulário
const campoDataHora = document.querySelector("#timestamp");

// guardo a data e a hora de agora (de quando a página abriu)
const agora = new Date();

// toISOString escreve a data num formato padrão, fácil de ler depois
campoDataHora.value = agora.toISOString();

// ----- Modais (janelas com os benefícios) -----
// pego todos os links "Saiba mais"
const linksModal = document.querySelectorAll(".link-modal");

linksModal.forEach((link) => {
  link.addEventListener("click", (evento) => {
    // impede o link de pular para o fim da página
    evento.preventDefault();

    // o data-modal do link diz qual janela abrir (ex: modal-ouro)
    const idDoModal = link.dataset.modal;
    const modal = document.querySelector("#" + idDoModal);

    // showModal abre a janela (o fundo fica escuro e a tecla ESC fecha)
    modal.showModal();
  });
});

// ----- Botões "Fechar" -----
const botoesFechar = document.querySelectorAll(".botao-fechar");

botoesFechar.forEach((botao) => {
  botao.addEventListener("click", () => {
    // closest procura o <dialog> em que o botão está e fecha ele
    botao.closest("dialog").close();
  });
});
