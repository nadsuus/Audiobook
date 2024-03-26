// 25/03/2024 @NADSUUS
const botaoPausePlay = document.getElementById('pause-play');
let estado = 0;
let indexAtual = 0;

let musicas = [
    { titulo: "Até a proxima", artista: "VMZ", src: "./listaDeMusicas/1.mp3", img: "Imagens/noite.gif" },

    { titulo: "Vou te levar", artista: "VMZ", src: "./listaDeMusicas/2.mp3", img: "Imagens/manha.gif" },

    { titulo: "te levar", artista: "VMZ", src: "./listaDeMusicas/3.mp3", img: "Imagens/tarde.gif" }
]

let musica = document.querySelector('audio');
let duracaoMusica = document.querySelector('.fim')
let imagem = document.querySelector('.imagemMusica')
let nomeDaMusica = document.querySelector('.nomeMusica');
let nomeDoArtista = document.querySelector('.nomeArtista')

let maximoDeMusicas = musicas.length - 1;

renderizar(indexAtual);

// --------------------------Eventos--------------------------------------
document.querySelector('.botaoPlay').addEventListener('click', checarSeEstaTocando);
musica.addEventListener('timeupdate', atualizarBarra);
musica.addEventListener('ended', () => {
    if (indexAtual <  maximoDeMusicas) {
        indexAtual++;
        } else {
            indexAtual = 0;
        };
        renderizar(indexAtual);
        musica.play();
        });

document.querySelector('.botaoAnterior').addEventListener('click', () => {
    if (indexAtual === 0) {
        indexAtual = maximoDeMusicas;
    } else {
        indexAtual--;
    }
    renderizar(indexAtual);
    tocarMusica();
});

document.querySelector('.botaoProximo').addEventListener('click', () => {
    
    if  (indexAtual >= maximoDeMusicas){
        indexAtual=0;
        renderizar(indexAtual);
        tocarMusica();
        } else 	{
            indexAtual++;
            renderizar(indexAtual);
            tocarMusica();
    }

});

// ---------------------------FUNCOES--------------------------------------

function renderizar(index) {
    musica.setAttribute('src', musicas[index].src);
    musica.addEventListener('loadeddata', () => {
        nomeDaMusica.textContent = (musicas[index].titulo);
        nomeDoArtista.textContent = (musicas[index].artista);
        imagem.src = (musicas[index].img)
        duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
    })
}

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