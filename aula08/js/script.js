let elemento = document.getElementById("figura");
let troca = document.getElementById("imagem");
let texto = document.getElementById("msg");

function mensagem(){
    texto.innerHTML = "Aprendendo sobre eventos";
    alert("Aprendendo sobre eventos!!");
    elemento.style.backgroundColor = "#0000"
    elemento.style.color = "#ffff"
}

function mostrarImg1(){
    troca.setAttribute("src", "imagens/yoshi.png");
    texto.innerHTML = "Imagem 1";
}

elemento.addEventListener("click",mensagem);
troca.addEventListener("mouseover",mostrarImg1);