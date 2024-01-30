// 30/01/2024

// Pausa - Play

const botaoPausePlay = document.getElementById('pause-play');
const botaoProximo = document.getElementById('proximo');
const botaoAnterior = document.getElementById('anterior');

const audioCapitulo = document.getElementById('audio-capitulo');
const nomeDoAlbum = document.getElementById('nomeDoAlbum')
const nomeDaMusica = document.getElementById('nomeDaMusica')

const numeroDeMusicas = 3;
let taTocando = 0;
let capituloAtual = 1;

// Mudar de Musica
function tocarFaixa() {
    audioCapitulo.play();
    botaoPausePlay.classList.remove('bi-play-circle-fill');
    botaoPausePlay.classList.add('bi-pause-circle');
}

// Pausar Musica
function pausarFaixa() {
    audioCapitulo.pause();
    botaoPausePlay.classList.remove('bi-pause-circle');
    botaoPausePlay.classList.add('bi-play-circle-fill');
}

// Controlador de Pausar e tocar
function tocarOuPausar() {
    if (taTocando == 0) {
        tocarFaixa();
        taTocando = 1;

    } else {
        pausarFaixa();
        taTocando = 0;
    }
}

// Trocar nome do  album e da musica

function trocarNomeDoAlbum() {
    nomeDoAlbum.innerText = 'Musica ' + capituloAtual;

}


botaoPausePlay.addEventListener('click', tocarOuPausar);

// Passar para a proxima musica

function proximaMusica() {
    if ( capituloAtual ==  numeroDeMusicas ) {
        capituloAtual = 1;
        } else {
            capituloAtual++;
        };
    audioCapitulo.src = "./books/Edits/" + capituloAtual +  ".mp3";
    trocarNomeDoAlbum();
    tocarFaixa();
    taTocando = 1;
}

botaoProximo.addEventListener('click' , proximaMusica);

//  Voltar para a musica anterior

function musicaAnterior () {
    if (capituloAtual == 1){
        capituloAtual = numeroDeMusicas;
    }else{
        capituloAtual--;
    };
    audioCapitulo.src = "./books/Edits/"+ capituloAtual +".mp3";
    trocarNomeDoAlbum();
    tocarFaixa();
    taTocando = 1;
};

botaoAnterior.addEventListener ('click', musicaAnterior);