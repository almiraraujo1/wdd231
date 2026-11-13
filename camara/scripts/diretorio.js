// Esse arquivo só é usado na página do diretório

const arquivoJson = "dados/membros.json";

const areaMembros = document.querySelector("#membros");
const botaoGrade = document.querySelector("#botao-grade");
const botaoLista = document.querySelector("#botao-lista");

// Transformar o número do nível no Nome (1=membro, 2=prata, 3=ouro)
function nomeDoNivel(nivel) {
  if (nivel === 3) {
    return "Ouro";
  } else if (nivel === 2) {
    return "Prata";
  } else {
    return "Membro";
  }
}

// Criar um cartão na tela para cada empresa
function mostrarMembros(listaDeMembros) {
  
  areaMembros.innerHTML = "";

  listaDeMembros.forEach((membro) => {
    // Criando o cartão
    const cartao = document.createElement("article");
    cartao.classList.add("cartao");

    // Colocando as informações da empresa dentro do cartão
    cartao.innerHTML = `
      <img src="imagens/${membro.imagem}" alt="Foto da empresa ${membro.nome}" width="120" height="120" loading="lazy">
      <h2>${membro.nome}</h2>
      <p>${membro.endereco}<br>${membro.cidade}</p>
      <p>${membro.telefone}</p>
      <a href="${membro.site}" target="_blank" rel="noopener">${membro.site}</a>
      <p class="nivel">${nomeDoNivel(membro.nivel)}</p>
    `;

    // Colocando o cartão na página
    areaMembros.appendChild(cartao);
  });
}

// Busca de dados no arquivo JSON (fetch com async/await)
async function carregarMembros() {
  try {
    // Aguarda o arquivo chegar...
    const resposta = await fetch(arquivoJson);

    // Se deu erro (ex: arquivo não encontrado), aviso:
    if (!resposta.ok) {
      throw new Error("Erro ao buscar o arquivo: " + resposta.status);
    }

    // Transformar a resposta em Lista de Empresas
    const membros = await resposta.json();

    // Mostra as empresas...
    mostrarMembros(membros);
  } catch (erro) {
    // Se deu errado, aviso:
    console.error(erro);
    areaMembros.innerHTML = "<p>Não foi possível carregar as empresas. Tente novamente mais tarde.</p>";
  }
}

// ----- Botões de grade e lista -----
botaoGrade.addEventListener("click", () => {
  // Troco a classe da área dos cartões
  areaMembros.classList.add("grade");
  areaMembros.classList.remove("lista");

  // Qual botão está ligado ?
  botaoGrade.classList.add("ativo");
  botaoLista.classList.remove("ativo");
  botaoGrade.setAttribute("aria-pressed", "true");
  botaoLista.setAttribute("aria-pressed", "false");
});

botaoLista.addEventListener("click", () => {
  areaMembros.classList.add("lista");
  areaMembros.classList.remove("grade");

  botaoLista.classList.add("ativo");
  botaoGrade.classList.remove("ativo");
  botaoLista.setAttribute("aria-pressed", "true");
  botaoGrade.setAttribute("aria-pressed", "false");
});

// Chamar a função quando a página abrir
carregarMembros();
