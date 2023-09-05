const jogoAdivinha = {
  semente: 50,
  tentativa: 0,
  numeroSorteado: function geraValorAleatorio() {
    return Math.round(Math.random() * this.semente);
  },
};

const btnVerifica = document.getElementById("btnVerifica");
const status = document.getElementById("status");
const tentativa = document.getElementById("tentativa");
const chute = document.getElementById("chute");
const apagarusuario = document.getElementById("nomeusuario");
const label = document.getElementById("usuario");
const usuario = document.getElementById("nome");
const btnUsuario = document.getElementById("btnUsuario");
usuario.value = "";
chute.value = "";

let numeroSorteado = jogoAdivinha.numeroSorteado();
btnUsuario.addEventListener("click", limpar);
console.log(numeroSorteado);

function atualizarTentativa(tentativa, valor) {
  if (valor > 1) {
    tentativa.innerHTML =
      'Tentativas : <span style="color: white">' + valor + "</span>";
  } else {
    tentativa.innerHTML =
      'Tentativa : <span style="color: white">' + valor + "</span>";
  }
}

function reiniciar() {
  const form = document.getElementById("form");
  const br = document.createElement("br");
  const br2 = document.createElement("br");
  const label = document.createElement("label");
  const usuario = document.createElement("input");
  const btnUsuario2 = document.createElement("button");
  btnUsuario2.addEventListener("click", limpar);
  usuario.value = "";
  btnUsuario2.innerText = "Cadastrar";
  label.innerHTML = "Insira seu nome";
  form.prepend(label);
  label.appendChild(br2);
  label.appendChild(usuario);
  label.appendChild(btnUsuario2);
  btnVerifica.innerText = "Verificar";
  tentativa.innerHTML = "Tentativa :  0";
  chute.disabled = false;
  chute.value = "";
  jogoAdivinha.tentativa = 0;
  status.innerHTML = "Adivinhe o número sorteado";
  numeroSorteado = jogoAdivinha.numeroSorteado();
  btnVerifica.removeEventListener("click", reiniciar);
}

function limpar(){
  if (label.parentNode) {
    label.parentNode.removeChild(label);
  }
}
const formAdivinha = document.getElementById("form");

formAdivinha.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!!chute.value == false) {
    status.innerHTML = '<span style="color:#FF3D00">Digite algum valor</span>';
    return;
  }


  atualizarTentativa(tentativa, ++jogoAdivinha.tentativa);

  if (numeroSorteado == chute.value) {
    status.innerHTML =
      '<span style="color:#00C853"> Parabéns, ' + usuario.value + ', você é um gênio da adivinhação!!</span>';
    chute.disabled = true;
    btnVerifica.innerText = "Tentar novamente?";
    btnVerifica.addEventListener("click", reiniciar);
  } else if (numeroSorteado > chute.value) {
    status.innerText = "O número sorteado é maior";
  } else if (numeroSorteado < chute.value) {
    status.innerText = "O número sorteado é menor";
  } 
  
  if (jogoAdivinha.tentativa == 5){
    status.innerText = "Suas tentativas acabaram :(";
    btnVerifica.innerText = "Tentar novamente?";
    btnVerifica.addEventListener("click", reiniciar);
  }
});
