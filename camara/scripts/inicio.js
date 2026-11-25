// =====================================================
// CLIMA (API do OpenWeatherMap)
// =====================================================

// Dados para montar a URL
const chave = "0c55a8fde4009b84fde15f4a22a1687b";
const latitude = "-3.734734443897766";
const longitude = "-38.65463174880561";

// URL do clima de agora 
const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${chave}&units=metric&lang=pt_br`;

// URL da previsão 
const urlPrevisao = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${chave}&units=metric&lang=pt_br`;

// Elementos do HTML que vou preencher
const iconeClima = document.querySelector("#icone-clima");
const temperatura = document.querySelector("#temperatura");
const descricaoClima = document.querySelector("#descricao-clima");
const maxima = document.querySelector("#maxima");
const minima = document.querySelector("#minima");
const umidade = document.querySelector("#umidade");
const listaPrevisao = document.querySelector("#previsao");

// Busca o clima atual
async function carregarClima() {
  try {
    const resposta = await fetch(urlClima);

    if (resposta.ok) {
      const dados = await resposta.json();
      mostrarClima(dados);
    } else {
      throw Error(await resposta.text());
    }
  } catch (erro) {
    console.log("Erro no clima: " + erro);
    descricaoClima.textContent = "Não foi possível carregar o clima.";
  }
}

// Clima na Tela
function mostrarClima(dados) {
  temperatura.textContent = Math.round(dados.main.temp);
  descricaoClima.textContent = dados.weather[0].description;
  maxima.textContent = Math.round(dados.main.temp_max);
  minima.textContent = Math.round(dados.main.temp_min);
  umidade.textContent = dados.main.humidity;

  // Ícone do Tempo
  const endereco = `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`;
  iconeClima.setAttribute("src", endereco);
  iconeClima.setAttribute("alt", dados.weather[0].description);
}

// Busca a previsão dos próximos dias
async function carregarPrevisao() {
  try {
    const resposta = await fetch(urlPrevisao);

    if (resposta.ok) {
      const dados = await resposta.json();
      mostrarPrevisao(dados.list);
    } else {
      throw Error(await resposta.text());
    }
  } catch (erro) {
    console.log("Erro na previsão: " + erro);
    listaPrevisao.innerHTML = "<li>Não foi possível carregar a previsão.</li>";
  }
}

// Pulo do Gato: A lista da API tem vários horários por dia...
// Junto por dia e guardo a maior temperatura de cada um
function mostrarPrevisao(listaDaApi) {
  const dias = [];

  listaDaApi.forEach((item) => {
    const data = new Date(item.dt * 1000);
    const chaveDoDia = data.toLocaleDateString("pt-BR"); // ex: 16/11/2026

    // Procuro se esse dia já está na minha lista
    let dia = dias.find((d) => d.chave === chaveDoDia);

    if (!dia) {
      // Dia Novo: guardo o nome do dia da semana, a máxima e a mínima
      const nomeDoDia = data.toLocaleDateString("pt-BR", { weekday: "long" });
      dia = {
        chave: chaveDoDia,
        nome: nomeDoDia,
        maxima: item.main.temp_max,
        minima: item.main.temp_min
      };
      dias.push(dia);
    } else {
      // Dia que já existe: atualizo se achei uma temperatura maior ou menor
      if (item.main.temp_max > dia.maxima) {
        dia.maxima = item.main.temp_max;
      }
      if (item.main.temp_min < dia.minima) {
        dia.minima = item.main.temp_min;
      }
    }
  });

  // Máxima e Mínima das próximas 24 horas (8 horários de 3 em 3 horas)
  const proximas24h = listaDaApi.slice(0, 8);

  // Começo com a temperatura do primeiro horário e vou comparando com os outros
  let maiorTemp = proximas24h[0].main.temp;
  let menorTemp = proximas24h[0].main.temp;

  proximas24h.forEach((item) => {
    if (item.main.temp > maiorTemp) {
      maiorTemp = item.main.temp;
    }
    if (item.main.temp < menorTemp) {
      menorTemp = item.main.temp;
    }
  });

  maxima.textContent = Math.round(maiorTemp);
  minima.textContent = Math.round(menorTemp);

  // Limpar a lista antes de mostrar
  listaPrevisao.innerHTML = "";

  // O dia de hoje é a posição 0 da lista, então eu pulo ele
  // slice(1, 4) pega as posições 1, 2 e 3 (os 3 dias seguintes)
  dias.slice(1, 4).forEach((dia) => {
    const rotulo = dia.nome.charAt(0).toUpperCase() + dia.nome.slice(1); // primeira letra maiúscula

    const item = document.createElement("li");
    item.innerHTML = `${rotulo}: <strong>${Math.round(dia.maxima)}°C</strong>`;
    listaPrevisao.appendChild(item);
  });
}

// =====================================================
// EMPRESAS EM DESTAQUE
// =====================================================

const arquivoJson = "dados/membros.json";
const areaDestaques = document.querySelector("#destaques");

// Transformar o número do nível no nome (1=membro, 2=prata, 3=ouro)
function nomeDoNivel(nivel) {
  if (nivel === 3) {
    return "Ouro";
  } else if (nivel === 2) {
    return "Prata";
  } else {
    return "Membro";
  }
}

// Busca as empresas e escolhe as que vão aparecer
async function carregarDestaques() {
  try {
    const resposta = await fetch(arquivoJson);

    if (!resposta.ok) {
      throw new Error("Erro ao buscar o arquivo: " + resposta.status);
    }

    const membros = await resposta.json();
    const prataOuOuro = membros.filter((membro) => membro.nivel >= 2);

    // Embaralho a lista
    prataOuOuro.sort(() => Math.random() - 0.5);

    // Pego as 3 primeiras da lista embaralhada
    const escolhidas = prataOuOuro.slice(0, 3);

    mostrarDestaques(escolhidas);
  } catch (erro) {
    console.error(erro);
    areaDestaques.innerHTML = "<p>Não foi possível carregar as empresas em destaque.</p>";
  }
}

// Cria um cartão para cada empresa escolhida
function mostrarDestaques(lista) {
  areaDestaques.innerHTML = "";

  lista.forEach((membro) => {
    const cartao = document.createElement("article");
    cartao.classList.add("destaque");

    // A "descricao" do JSON faz o papel de slogan da empresa
    cartao.innerHTML = `
      <h3>${membro.nome}</h3>
      <p class="slogan">${membro.descricao}</p>
      <div class="destaque-corpo">
        <img src="imagens/${membro.imagem}" alt="Logotipo da empresa ${membro.nome}" width="90" height="90" loading="lazy">
        <ul>
          <li><strong>Endereço:</strong> ${membro.endereco}, ${membro.cidade}</li>
          <li><strong>Telefone:</strong> ${membro.telefone}</li>
          <li><strong>Site:</strong> <a href="${membro.site}" target="_blank" rel="noopener">${membro.site}</a></li>
          <li><strong>Nível:</strong> ${nomeDoNivel(membro.nivel)}</li>
        </ul>
      </div>
    `;

    areaDestaques.appendChild(cartao);
  });
}

// =====================================================
// INICIAR
// =====================================================
carregarClima();
carregarPrevisao();
carregarDestaques();
