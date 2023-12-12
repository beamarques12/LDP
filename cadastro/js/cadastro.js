let tentativas = 0;
const limiteTentativas = 3;

let listaRegistro = {
    ultimoIdGravado: 0,
    pessoas: [{ id: 10, usuario: "DebAn", email: "debora@gmail.com", nome: "Debora Antunes", telefone: '(11) 2552-3443', sexo: 'feminino', linguagens: 'Java' }]
};


function validarFormulario() {
        // Validação para a primeira etapa
        let usuario = document.getElementById('tusuario').value;
        let email = document.getElementById('temail').value;
        let senha = document.getElementById('tsenha1').value;
        let senha2 = document.getElementById('tsenha2').value;

        if (usuario === "" || email === "" || senha === "" || senha2 === "") {
            alert("Por favor, preencha todos os campos na primeira etapa.");
            return false;
        }

        //validação do email
        let emailPadrao = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if(!email.match(emailPadrao)){
            alert("Por favor digite um e-mail válido");
            return false;
        }

        const emailExistente = listaRegistro.pessoas.some(pessoa => pessoa.email === email);
        if (emailExistente) {
            alert("Este email já está cadastrado. Por favor, use um email diferente.");
            return false;
    }

        //validação da senha (mínimo 8 caracteres)
        if(senha.length < 8 ){
            alert("A senha deve ter no minimo 8 caracteres");
            return false;
        }
        //verificando se as duas senhas são iguais
        if(senha !== senha2){
            alert("As senhas não coincidem. Por favor, tente novamente");
            return false;
        }

        return true
    }


function desenharTabela() {
    const tbody = document.getElementById("listaRegistroBody");
    if (tbody) {
        tbody.innerHTML = listaRegistro.pessoas.map(pessoa => {
            return `<tr>
                <td>${pessoa.id}</td>
                <td>${pessoa.usuario}</td>
                <td>${pessoa.email}</td>
                <td>${pessoa.senha}</td>
            </tr>`;
        }).join('');
    }
}

function inserirPessoa(usuario, email, senha) {
    let novoID = listaRegistro.pessoas.length + 1;
    let userData = {
        id: novoID,
        usuario: usuario,
        email: email,
        senha: senha,
    };
    listaRegistro.pessoas.push(userData);
    localStorage.setItem('pessoa', JSON.stringify(listaRegistro));
    desenharTabela();
}

function limparDados() {
    document.getElementById('tusuario').value = '';
    document.getElementById('temail').value = '';
    document.getElementById('tsenha1').value = '';
    document.getElementById('tsenha2').value = '';
}

function visualizar(pagina, novo = false) {
    document.body.setAttribute("page", pagina);
    if (pagina === "cadastro") {
        if (novo) {
            limparDados();
            limparLocalStorage();
        }
        document.getElementById("tusuario").focus();
    }
}

function enviarDados() {
    if (validarFormulario()) {
        const usuario = document.getElementById('tusuario').value;
        const email = document.getElementById('temail').value;
        const senha = document.getElementById('tsenha1').value;

        inserirPessoa(usuario, email, senha);

        limparDados();
        visualizar('lista');
    }
}

function limparLocalStorage() {
    localStorage.removeItem("pessoa");
}

function lerBD() {
    const lista = localStorage.getItem("pessoa");
    if (lista) {
        listaRegistro = JSON.parse(lista);
        desenharTabela();
    }
}

function fazerLogin() {
    const emailLogin = document.getElementById('emailLogin').value;
    const senhaLogin = document.getElementById('senhaLogin').value;

    const usuarioEncontrado = listaRegistro.pessoas.find(usuario => usuario.email === emailLogin);

    if (usuarioEncontrado) {
        if(usuarioEncontrado.senha === senhaLogin) {
            alert('Login bem-sucedido!');
            tentativas = 0;
            visualizar('lista');
        } else {
            tentativas++;

            if (tentativas === limiteTentativas) {
                alert('Você atingiu o limite de tentativas. Por favor, tente novamente mais tarde.');

            } else {
                alert(`Senha incorreta. Tentativa ${tentativas}/${limiteTentativas}.`);
            }
        }
    } else {
        alert('Email não encontrado. Por favor, verifique suas credenciais.');
    }
}

function redirecionar() {
    if (validarFormulario()) {
        visualizar('login');
    }
}

function initializePage() {
    lerBD();
    desenharTabela();
    document.querySelector('button[name="btncadastra"]').addEventListener('click', enviarDados);
}

window.onload = initializePage;