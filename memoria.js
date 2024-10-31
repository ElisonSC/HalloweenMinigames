document.addEventListener('DOMContentLoaded', () => {
    const cartasArray = [
        { nome: 'abobora', img: 'imagens/abobora.jpg' },
        { nome: 'fantasma', img: 'imagens/fantasma.jpg' },
        { nome: 'bruxa', img: 'imagens/bruxa.jpg' },
        { nome: 'gato', img: 'imagens/gato.jpg' },
        { nome: 'morcego', img: 'imagens/morcego.jpg' },
        { nome: 'caldeirao', img: 'imagens/caldeirao.jpg' },
        { nome: 'arvore', img: 'imagens/arvore.jpg' },
        { nome: 'vassoura', img: 'imagens/vassoura.jpg' },
        { nome: 'zumbi', img: 'imagens/zumbi.jpg' },
        { nome: 'caveira', img: 'imagens/caveira.jpg' },
        { nome: 'lua', img: 'imagens/lua.jpg' },
        { nome: 'velas', img: 'imagens/velas.jpg' }
    ];

    const grid = document.querySelector('#tabuleiro');
    const botaoReiniciar = document.querySelector('#botao-reiniciar');
    let cartasEscolhidas = [];
    let cartasEscolhidasId = [];
    let cartasCombinadas = [];

    // Duplicar e embaralhar as cartas
    let cartasJogo = cartasArray.concat(cartasArray);
    cartasJogo.sort(() => 0.5 - Math.random());

    // Criar o tabuleiro
    function criarTabuleiro() {
        grid.innerHTML = ''; // Limpar o tabuleiro antes de criar
        for (let i = 0; i < cartasJogo.length; i++) {
            const carta = document.createElement('div');
            carta.classList.add('carta');
            carta.setAttribute('data-id', i);

            const cartaInner = document.createElement('div');
            cartaInner.classList.add('carta-inner');

            const cartaFront = document.createElement('div');
            cartaFront.classList.add('carta-front');

            const cartaBack = document.createElement('div');
            cartaBack.classList.add('carta-back');
            cartaBack.style.backgroundImage = `url(${cartasJogo[i].img})`;

            cartaInner.appendChild(cartaFront);
            cartaInner.appendChild(cartaBack);
            carta.appendChild(cartaInner);
            grid.appendChild(carta);

            carta.addEventListener('click', virarCarta);
        }
    }

    // Virar a carta
    function virarCarta() {
        const cartaId = this.getAttribute('data-id');
        if (cartasEscolhidasId.length < 2 && !this.classList.contains('virada')) {
            cartasEscolhidas.push(cartasJogo[cartaId].nome);
            cartasEscolhidasId.push(cartaId);
            this.classList.add('virada');

            if (cartasEscolhidas.length === 2) {
                setTimeout(verificarPar, 500);
            }
        }
    }

    // Verificar se as cartas combinam
    function verificarPar() {
        const cartas = document.querySelectorAll('.carta');
        const [opcaoUmId, opcaoDoisId] = cartasEscolhidasId;

        if (cartasEscolhidas[0] === cartasEscolhidas[1]) {
            cartasCombinadas.push(cartasEscolhidas[0]);
            cartas[opcaoUmId].removeEventListener('click', virarCarta);
            cartas[opcaoDoisId].removeEventListener('click', virarCarta);
            // Efeito sonoro de acerto
            tocarSom('imagens/som-acerto.wav');
        } else {
            cartas[opcaoUmId].classList.remove('virada');
            cartas[opcaoDoisId].classList.remove('virada');
            // Efeito sonoro de erro
            tocarSom('imagens/som-erro.wav');
        }

        cartasEscolhidas = [];
        cartasEscolhidasId = [];

        if (cartasCombinadas.length === cartasArray.length) {
            setTimeout(() => {
                alert('🎉 Parabéns! Você encontrou todos os pares! 🎉');
            }, 500);
        }
    }

    // Tocar efeitos sonoros
    function tocarSom(src) {
        const som = new Audio(src);
        som.play();
    }

    // Reiniciar o jogo
    botaoReiniciar.addEventListener('click', () => {
        cartasEscolhidas = [];
        cartasEscolhidasId = [];
        cartasCombinadas = [];
        cartasJogo.sort(() => 0.5 - Math.random());
        criarTabuleiro();
    });

    criarTabuleiro();
});
