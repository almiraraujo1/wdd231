// OBTER ELEMENTOS HTML DO DOCUMENTO
const mLocal = document.querySelector('#local');
const mDescricao = document.querySelector('#descricao');
const mTemperatura = document.querySelector('#temperatura');
const mImagem = document.querySelector('#imagem');

// CRIAR VARIAVEIS NECESSARIAS PARA A URL
const mChave = "0c55a8fde4009b84fde15f4a22a1687b"
const mLat = "-3.734734443897766"
const mLon = "-38.65463174880561"
const mLang = 'pt_br'

const mURL = '//api.openweathermap.org/data/2.5/weather?lat=${mLat}&lon=${mLon}&appid=${mChave}&units=metric&lang=${mLang}'

// OBTER DADOS DA API
async function apiFetch() {
    try {
        const reposta = await fetch(mURL);
        if (resposta.ok) {
            const dados = await resposta.json();
            console.log(dados);
            exibirResultados(dados);
        } else {
            throw Error(await resposta.text());
        }
    }    catch (erro){
        console.log("Mensagem de Erro >>" + erro);
    }
}

// EXIBIR OS DADOS DA API
function exibirResultados(dados){
    mLocal.innerHTML = dados.name
    mDescricao.innerHTML = dados.weather[0].description;
    mTemperatura.innerHTML = '${dados.main.temp}°C';
    const iconsrc = 'https://openweathermap.org/img/w/${dados.weather[0].icon}.png';
    mImagem.setAttribute('src', iconsrc);
    mImagem.setAttribute('alt', dados.weather[0].description);
}

// INICIAR
apiFetch();