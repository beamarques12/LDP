const grid = document.querySelector('.grid');

const personagens = [
    'mario', 'luigi', 'peach', 'toad', 'yoshi', 'donkey', 'bu', 'bowser'
]

let primeiraCarta = '';
let segundaCarta = '';

const checagem = () => {
    const primeiroPersonagem = primeiraCarta.getAttribute('data-character');
    const segundoPersonagem = segundaCarta.getAttribute('data-character');
    if(primeiroPersonagem === segundoPersonagem){

    } else {
        setTimeout (() => {
            primeiraCarta.classList.remove('revelar-carta');
            segundaCarta.classList.remove('revelar-carta');
            primeiraCarta = '';
            segundaCarta = '';
        }, 500);


    }
}

const revelarCarta = ({target}) => {
    target.parentNode.classList.add('revelar-carta')
    if(target.parentNode.className.includes('revelar-carta')){
        return;
    }

    if(primeiraCarta === ''){
        target.parentNode.classList.add('revelar-carta')
        primeiraCarta = target.parentNode
    } else if(segundaCarta === ''){
        target.parentNode.classList.add('revelar-carta')
        segundaCarta = target.parentNode

        checagem();
    }
}

const criarCarta =  (personagem) => {
    const carta = document.createElement('div');
    const back = document.createElement('div');
    const front = document.createElement('div');
    carta.className = 'card';
    front.className = 'face front';
    back.className = 'face back';

    front.style.backgroundImage = `url('imagens/${personagem}.png')`
    carta.appendChild(front);
    carta.appendChild(back);

    carta.addEventListener('click', revelarCarta)

    carta.setAttribute('data-personagem', personagem)
    return carta;
}


const jogo = () => {
    const personagensduplos = [ ...personagens, ...personagens];
    const sorteiopersonagem = personagensduplos.sort(() => Math.random() - 0.5);
    sorteiopersonagem.forEach((personagem) => {
        const carta = criarCarta(personagem);
        grid.appendChild(carta);
    });
}

jogo();