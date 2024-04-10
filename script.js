// 25/03/2024 @NADSUUS
const botaoPausePlay = document.getElementById('pause-play');
let estado = 0;
let indexAtual = 0;

let musicas = [
    { titulo: "Até a proxima", artista: "VMZ", src: "./listaDeMusicas/1.mp3", img: "Imagens/noite.gif" },

    { titulo: "Vou te levar", artista: "VMZ", src: "./listaDeMusicas/2.mp3", img: "Imagens/manha.gif" },

    { titulo: "te levar", artista: "VMZ", src: "./listaDeMusicas/3.mp3", img: "Imagens/tarde.gif" }
]

// Seleciona a lista de reprodução (playlist)
const playlist = document.getElementById('playlist');

// Função para adicionar uma música à lista de reprodução
function adicionarMusica(musica, index) {
    // Cria um novo elemento de lista (li)
    const itemLista = document.createElement('li');
    itemLista.classList.add('musica');

    // Adiciona a imagem da música
    const imagemMusica = document.createElement('img');
    imagemMusica.classList.add('fotoMusica');
    imagemMusica.src = musica.img;
    imagemMusica.alt = 'Imagem da música';
    itemLista.appendChild(imagemMusica);

    // Adiciona o título da música
    const tituloMusica = document.createElement('h3');
    tituloMusica.textContent = musica.titulo;
    itemLista.appendChild(tituloMusica);

    // Adiciona a duração da música
    const duracaoMusica = document.createElement('h3');
    duracaoMusica.textContent = '02:45'; // Ajuste conforme necessário
    itemLista.appendChild(duracaoMusica);

    // Adiciona o elemento de lista à lista de reprodução
    playlist.appendChild(itemLista);
}

// Adiciona todas as músicas à lista de reprodução
musicas.forEach(adicionarMusica);


let musica = document.querySelector('audio');
let duracaoMusica = document.querySelector('.fim')
let imagem = document.querySelector('.imagemMusica')
let nomeDaMusica = document.querySelector('.nomeMusica');

let nomeDaMusicaAQui =  document.querySelector('.musicaAqui')

let nomeDoArtista = document.querySelector('.nomeArtista')

let maximoDeMusicas = musicas.length - 1;

renderizarMusica(indexAtual);

// --------------------------Eventos--------------------------------------
document.querySelector('.botaoPlay').addEventListener('click', checarSeEstaTocando);
musica.addEventListener('timeupdate', atualizarBarra);
musica.addEventListener('ended', () => {
    if (indexAtual <  maximoDeMusicas) {
        indexAtual++;
        } else {
            indexAtual = 0;
        };
        renderizarMusica(indexAtual);
        musica.play();
        });

document.querySelector('.botaoAnterior').addEventListener('click', () => {
    if (indexAtual === 0) {
        indexAtual = maximoDeMusicas;
    } else {
        indexAtual--;
    }
    renderizarMusica(indexAtual);
    tocarMusica();
});

document.querySelector('.botaoProximo').addEventListener('click', () => {
    
    if  (indexAtual >= maximoDeMusicas){
        indexAtual=0;
        renderizarMusica(indexAtual);
        tocarMusica();
        } else 	{
            indexAtual++;
            renderizarMusica(indexAtual);
            tocarMusica();
    }

});

// ---------------------------FUNCOES--------------------------------------

function renderizarMusica(index) {
    musica.setAttribute('src', musicas[index].src);
    musica.addEventListener('loadeddata', () => {
        nomeDaMusica.textContent = (musicas[index].titulo);
        nomeDoArtista.textContent = (musicas[index].artista);
        imagem.src = (musicas[index].img);
        duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));

    })
}

// function renderizarLista(index) {

//     musica.addEventListener('loadeddata', () => {
//         nomeDaMusicaAQui.textContent = (musicas[index].titulo);
//         nomeDoArtista.textContent = (musicas[index].artista);
//         imagem.src = (musicas[index].img);
//         duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));

// } }

function tocarMusica() {
    musica.play();
    botaoPausePlay.classList.remove('bi-play-circle-fill');
    botaoPausePlay.classList.add('bi-pause-circle');
}

function pararMusica() {
    musica.pause();
    botaoPausePlay.classList.remove('bi-pause-circle');
    botaoPausePlay.classList.add('bi-play-circle-fill');
}

function checarSeEstaTocando() {
    if (estado == 0) {
        tocarMusica();
        estado = 1;
    } else {
        pararMusica();
        estado = 0;
    }
}

function atualizarBarra() {
    let barra = document.querySelector('progress');
    barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + '%';

    let tempoDecorrido = document.querySelector('.inicio');
    duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
}

function segundosParaMinutos(segundos) {
    let CampoMin = Math.floor(segundos / 60);
    let CampSeg = segundos % 60;

    if (CampSeg < 10) {
        CampSeg = '0' + CampSeg;
    }
    return CampoMin + ":" + CampSeg;
}