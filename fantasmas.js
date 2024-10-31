document.addEventListener('DOMContentLoaded', () => {
    const areaJogo = document.getElementById('area-jogo');
    const botaoIniciar = document.getElementById('botao-iniciar');
    const pontuacaoDisplay = document.getElementById('pontuacao');

    let pontuacao = 0;
    let jogoAtivo = false;
    let intervaloFantasma;

    // Função para criar um fantasma
    function criarFantasma() {
        const fantasma = document.createElement('div');
        fantasma.classList.add('fantasma');

        // Posição aleatória
        const posX = Math.floor(Math.random() * (areaJogo.offsetWidth - 100));
        const posY = Math.floor(Math.random() * (areaJogo.offsetHeight - 100));

        fantasma.style.left = `${posX}px`;
        fantasma.style.top = `${posY}px`;

        areaJogo.appendChild(fantasma);

        // Remover o fantasma após um tempo
        setTimeout(() => {
            if (areaJogo.contains(fantasma)) {
                areaJogo.removeChild(fantasma);
            }
        }, 1000);

        // Incrementar a pontuação ao clicar
        fantasma.addEventListener('click', () => {
            pontuacao++;
            pontuacaoDisplay.textContent = pontuacao;
            tocarSom('imagens/som-acerto.mp3');
            areaJogo.removeChild(fantasma);
        });
    }

    // Função para iniciar o jogo
    function iniciarJogo() {
        if (jogoAtivo) return;

        jogoAtivo = true;
        pontuacao = 0;
        pontuacaoDisplay.textContent = pontuacao;
        botaoIniciar.disabled = true;

        intervaloFantasma = setInterval(criarFantasma, 800);

        // Tempo de jogo (30 segundos)
        setTimeout(() => {
            jogoAtivo = false;
            clearInterval(intervaloFantasma);
            botaoIniciar.disabled = false;
            alert(`Fim de jogo! Sua pontuação foi: ${pontuacao} pontos.`);
        }, 30000); // 30000 milissegundos = 30 segundos
    }

    // Tocar efeitos sonoros
    function tocarSom(src) {
        const som = new Audio(src);
        som.play();
    }

    botaoIniciar.addEventListener('click', iniciarJogo);
});
