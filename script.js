// 20/03/2024
// Instagram : Nadsuu_Santos
// GitHub: @Nadsuus

const botaoPausePlay = document.getElementById('pause-play');
const botaoProximo = document.getElementById('proximo');
const botaoAnterior = document.getElementById('anterior');

const musicas = [
    { titulo: 'Estacoes' },
    { artista: 'Vmz' },
    { src: 'musicas/1.mp3'},
    {imagem: 'Imagens/foto1.gif'}
]

const musica = document.getElementById('musicaAtual');
const imagem = document.querySelector('.imagemDaMusica');
const nomeDoAlbum = document.getElementById('nomeDoAlbum')
const nomeDaMusica = document.getElementById('nomeDaMusica')

const numeroDeMusicas = 3;
let taTocando = 0;
let musicaAtual = 1;

// Pausa - Play ---------------------------------------------------
// Mudar de Musica --------------------------------------------------
function tocarFaixa() {
    musica.play();
    botaoPausePlay.classList.remove('bi-play-circle-fill');
    botaoPausePlay.classList.add('bi-pause-circle');
}

// Pausar Musica ---------------------------------------------------
function pausarFaixa() {
    musica.pause();
    botaoPausePlay.classList.remove('bi-pause-circle');
    botaoPausePlay.classList.add('bi-play-circle-fill');
}


//Atualização da Barra ---------------------------------------------------

musica.addEventListener('timeupdate', atualizarBarra);

function atualizarBarra() {
    let barra = document.querySelector('progress');
    barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + "%";

    let duracaoDaMusica = document.querySelector('.fim');
    duracaoDaMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));


    let tempoDecorrido = document.querySelector('.inicio');
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));

}

//Convertendo segundos para minutos -----------------------------------
function segundosParaMinutos(segundos) {
    let campoMinutos = Math.floor(segundos / 60);
    let campoSegundos = segundos % 60;
    if (campoSegundos < 10) {
        campoSegundos = "0" + campoSegundos;
    }
    return campoMinutos + ':' + campoSegundos;
}

// Controlador de Pausar e tocar ---------------------------------------------------
function tocarOuPausar() {
    if (taTocando == 0) {
        tocarFaixa();
        taTocando = 1;

    } else {
        pausarFaixa();
        taTocando = 0;
    }
}

// Trocar nome do  album e da musica ---------------------------------------------------

function trocarNomeDaMusica() {
    nomeDaMusica.innerText = 'Musica ' + musicaAtual;

}


botaoPausePlay.addEventListener('click', tocarOuPausar);

// Passar para a proxima musica ---------------------------------------------------

function proximaMusica() {
    if (musicaAtual == numeroDeMusicas) {
        musicaAtual = 1;
    } else {
        musicaAtual++;
    };
    musica.src = "./books/Edits/" + musicaAtual + ".mp3";
    trocarNomeDaMusica();
    tocarFaixa();
    taTocando = 1;
}

botaoProximo.addEventListener('click', proximaMusica);

//  Voltar para a musica anterior ---------------------------------------------------

function musicaAnterior() {
    if (musicaAtual == 1) {
        musicaAtual = numeroDeMusicas;
    } else {
        musicaAtual--;
    };
    musica.src = "./books/Edits/" + musicaAtual + ".mp3";
    trocarNomeDaMusica();
    tocarFaixa();
    taTocando = 1;
};

botaoAnterior.addEventListener('click', musicaAnterior);