// Esse arquivo só é usado na página de agradecimento (agradecimento.html)

// Atenção: O formulário usa o método get, então os dados vêm no endereço da página
// Exemplo: agradecimento.html?nome=Maria&sobrenome=Silva...
// URLSearchParams ajuda a ler esses dados
const parametros = new URLSearchParams(window.location.search);

function mostrar(id, valor) {
  const elemento = document.querySelector("#" + id);

  elemento.textContent = valor || "Não informado";
}

// Preencher os campos obrigatórios do formulário
mostrar("dado-nome", parametros.get("nome"));
mostrar("dado-sobrenome", parametros.get("sobrenome"));
mostrar("dado-email", parametros.get("email"));
mostrar("dado-celular", parametros.get("celular"));
mostrar("dado-empresa", parametros.get("empresa"));

const textoDataHora = parametros.get("timestamp");

if (textoDataHora) {
  const dataHora = new Date(textoDataHora);
  mostrar("dado-datahora", dataHora.toLocaleString("pt-BR"));
} else {
  mostrar("dado-datahora", "");
}

const nome = parametros.get("nome");

if (nome) {
  document.querySelector("#saudacao").textContent = ", " + nome;
}
