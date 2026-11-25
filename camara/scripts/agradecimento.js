// Esse arquivo só é usado na página de agradecimento (agradecimento.html)

// O formulário usa o método get, então os dados vêm no endereço da página
// Exemplo: agradecimento.html?nome=Maria&sobrenome=Silva...
// URLSearchParams ajuda a ler esses dados
const parametros = new URLSearchParams(window.location.search);

// Função que coloca um valor dentro de um elemento da página
function mostrar(id, valor) {
  const elemento = document.querySelector("#" + id);

  // textContent coloca só texto (mais seguro que innerHTML para dados digitados)
  // se não veio nada, mostro "Não informado"
  elemento.textContent = valor || "Não informado";
}

// Preencho os campos obrigatórios do formulário
mostrar("dado-nome", parametros.get("nome"));
mostrar("dado-sobrenome", parametros.get("sobrenome"));
mostrar("dado-email", parametros.get("email"));
mostrar("dado-celular", parametros.get("celular"));
mostrar("dado-empresa", parametros.get("empresa"));

// Data e hora: o valor vem em formato padrão e eu transformo em data brasileira
const textoDataHora = parametros.get("timestamp");

if (textoDataHora) {
  const dataHora = new Date(textoDataHora);
  mostrar("dado-datahora", dataHora.toLocaleString("pt-BR"));
} else {
  mostrar("dado-datahora", "");
}

// Coloca o nome no título ("Obrigado, Maria!")
const nome = parametros.get("nome");

if (nome) {
  document.querySelector("#saudacao").textContent = ", " + nome;
}
