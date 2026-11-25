// Esse arquivo só é usado na página de associação (associacao.html)

// ----- Data e hora no campo oculto -----
const campoDataHora = document.querySelector("#timestamp");
const agora = new Date();

campoDataHora.value = agora.toISOString();

// ----- Modais (janelas com os benefícios) -----
const linksModal = document.querySelectorAll(".link-modal");

linksModal.forEach((link) => {
  link.addEventListener("click", (evento) => {

    evento.preventDefault();

    const idDoModal = link.dataset.modal;
    const modal = document.querySelector("#" + idDoModal);

    modal.showModal();
  });
});

// ----- Botões "Fechar" -----
const botoesFechar = document.querySelectorAll(".botao-fechar");

botoesFechar.forEach((botao) => {
  botao.addEventListener("click", () => {
    botao.closest("dialog").close();
  });
});
