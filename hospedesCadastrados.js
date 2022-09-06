
let myHeaders = new Headers();

let myInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
};

let myRequest = new Request('http://api.teste.local/api/hospede', myInit);

fetch(myRequest)
    .then(function (response) {
        return response.json();

    })
    .then(function (data) {
        insertDataIntoTable('hospedeTable', data.hospedes);
    });

function remove(id) {
    fetch(`http://api.teste.local/api/hospede/${id}`, {
        method: 'DELETE',
        headers: myHeaders,
        mode: 'cors',
    }).then((response) => {
        showModalExclui('Hóspede excluido com sucesso!!');
        console.log("Usuário excluido com sucesso");
    }).catch((error) => {
        showModalExclui('Não foi possível cadastrar o hóspede!!')
        console.log(error);
    })
}

function telefone(hospede) {

    let numeros = '';
    let numerosDDD = '';

    for (let telefone of hospede.telefones) {
        numerosDDD = `${telefone.ddd} `;
        numeros = `${numeros}${telefone.numeroTelefone} `;
    }

    return [
        numerosDDD,
        numeros
    ];
}

// function telefoneDDD(hospede) {

//     let numerosDDD = '';

//     for (let telefone of hospede.telefones) {
//         numerosDDD = `${numerosDDD} ${telefone.ddd}`;
//     }

//     return [
//         numerosDDD
//     ];
// }

function createTelefoneHtml(ddd, numero) {

    return `<div class="telefone-item">
    <label for="ddd" class="col-form-label">DDD:</label>
    <input type="text" class="form-control" id="ddd" value="${ddd}">

    <label for="numeroTelefone" class="col-form-label">Número:</label>
    <input type="text" class="form-control" id="numeroTelefone" value="${numero}">
</div>
`;

    // let numeros = '';

    // for (let telefone of numeros) {
    //     numeros = telefone.insertAdjacentHTML('beforeend', telefones)
    // }

    // return numeros;
}

// function adicionaCamposModal(hospedes){

//     for (let telefone of hospedes.telefones) {
//         numeros = telefone.insertAdjacentHTML('beforeend', createTelefoneHtml())
//     }

//     return numeros;
// }

// função para mostrar dados na modal
// criado variaveis para cada um pegando seu id que está no banco
// fazendo atribuições para cada variavel com tipo e valor e pegando o hóspede que foi passado por parametro
// e acessando os dados 

function mostrarDados(hospede) {

    let id = document.getElementById('id');
    let nome = document.getElementById('nome');
    let cpf = document.getElementById('cpf');

    let dataNascimento = document.getElementById('meeting_time_data');
    let email = document.getElementById('floatingInputEmail');

    let cep = document.getElementById('cep');
    let rua = document.getElementById('rua');
    let numero = document.getElementById('numero');
    let bairro = document.getElementById('bairro');
    let cidade = document.getElementById('cidade');
    let estado = document.getElementById('estado');

    let ddd = document.getElementById('ddd');
    let numeroTelefone = document.getElementById('numeroTelefone');

    let entrada = document.getElementById('meeting_time');
    let saida = document.getElementById('meeting_time_saida');

    id.setAttribute('type', 'hidden');
    id.setAttribute('value', hospede.id);

    nome.setAttribute('type', 'text');
    nome.setAttribute('value', hospede.nome);

    cpf.setAttribute('type', 'text');
    cpf.setAttribute('value', hospede.cpf);

    dataNascimento.setAttribute('type', 'date');
    dataNascimento.setAttribute('value', hospede.dataNascimento);

    email.setAttribute('type', 'email');
    email.setAttribute('value', hospede.email);

    cep.setAttribute('type', 'text');
    cep.setAttribute('value', `${hospede?.endereco?.cep}`);

    rua.setAttribute('type', 'text');
    rua.setAttribute('value', `${hospede?.endereco?.rua}`);

    numero.setAttribute('type', 'text');
    numero.setAttribute('value', `${hospede?.endereco?.numero}`);

    bairro.setAttribute('type', 'text');
    bairro.setAttribute('value', `${hospede?.endereco?.bairro}`);

    cidade.setAttribute('type', 'text');
    cidade.setAttribute('value', `${hospede?.endereco?.cidade}`);

    estado.setAttribute('type', 'text');
    estado.setAttribute('value', `${hospede?.endereco?.estado}`);

    ddd.setAttribute('type', 'text');
    ddd.setAttribute('value', telefone(hospede)[0]);

    numeroTelefone.setAttribute('type', 'text');
    numeroTelefone.setAttribute('value', telefone(hospede)[1]);

    entrada.setAttribute('type', 'datetime-local');
    entrada.setAttribute('value', hospede.entrada);

    saida.setAttribute('type', 'datetime-local');
    saida.setAttribute('value', hospede.saida);
}

function getHospede(id) {
    fetch(`http://api.teste.local/api/hospede/${id}`, {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
    })
        .then((response) => response.json())
    .then(result => {
        console.log(result.hospede);
    }).catch((error) => {
        console.log(error);
    });
}

// função que cria as linhas da tabela, 
// a variavel columns recebe a função createCols
// a variavel row, o document.createElement cria o elemento especificado que no caso é o tr(linha)
// feito um for, para percorrer pelas colunas a adicionar as linhas


function createRow(hospede) {
    let columns = createCols(hospede);

    let row = document.createElement('tr');

    for (let coluna of columns) {
        row.appendChild(coluna);
    }

    row.setAttribute('data-rowinfo', JSON.stringify(hospede));

    row.style = "text-align:center; font-size:13px;";

    return row;
}

function update(hospede) {

    let id = document.getElementById("id").value;
    let nomeHospede = document.getElementById("nome").value;
    let cpfHospede = document.getElementById("cpf").value;
    let emailHospede = document.getElementById("floatingInputEmail").value;

    let dataNascimentoHospede = document.getElementById("meeting_time_data").value;
    let entradaHospede = document.getElementById("meeting_time").value;
    let saidaHospede = document.getElementById("meeting_time_saida").value;

    let dddHospede = document.getElementById("ddd").value;
    let numeroTelefoneHospede = document.getElementById("numeroTelefone").value;

    let enderecoHospede = {
        cep: document.getElementById("cep").value,
        rua: document.getElementById("rua").value,
        bairro: document.getElementById("bairro").value,
        numero: document.getElementById("numero").value,
        cidade: document.getElementById("cidade").value,
        estado: document.getElementById("estado").value
    }

    fetch(`http://api.teste.local/api/hospede/${id}`, {
        method: "PUT",
        headers: {
            'Content-type': 'apllication/json'
        },
        body: JSON.stringify(
            {
                hospede: id,
                nome: nomeHospede, cpf: cpfHospede, entrada: entradaHospede, saida: saidaHospede,
                ddd: dddHospede, email: emailHospede, dataNascimento: dataNascimentoHospede,
                endereco: enderecoHospede
            }
        )
    })
        .then(response => {
            if (response.json) {
                showModalMensagem();
                console.log(response)
            }
            else {
                showModalMensagemErro();
                console.log("HTTP request unsuccessful")
            }
            return response
        })
}

// Função de criar colunas
// Variaveis para cada coluna criando um elemento que no caso é td de tabela

function createCols(hospede) {

    let colunaId = document.createElement('td');
    let colunaNome = document.createElement('td');
    let colunaCpf = document.createElement('td');
    let colunaDataNascimento = document.createElement('td');
    let colunaEmail = document.createElement('td');

    let colunaEndereco = document.createElement('td');
    let colunaTelefone = document.createElement('td');
    let colunaEntrada = document.createElement('td');
    let colunaSaida = document.createElement('td');
    let colunaAcao = document.createElement('td');

    let botaoEditar = document.createElement('button');
    let botaoExcluir = document.createElement('button');

    botaoExcluir.innerHTML = `
    <i class="bi bi-trash-fill";></i>
    `;

    botaoExcluir.style = "margin: 5px 0px 5px 5px;"
    botaoEditar.style = "margin: 5px 0px 5px 0px;"

    botaoEditar.classList.add("btn");
    botaoEditar.classList.add("btn-warning");
    botaoEditar.classList.add("btn-sm");

    botaoExcluir.classList.add("btn");
    botaoExcluir.classList.add("btn-danger");
    botaoExcluir.classList.add("btn-sm");

    botaoEditar.innerHTML = `
    <i class="bi bi-pencil-square"></i>
    `;

    //variavel criada em cima
    colunaId.innerHTML = hospede.id;
    colunaNome.innerHTML = hospede.nome;
    colunaCpf.innerHTML = hospede.cpf;
    colunaDataNascimento.innerHTML = hospede.dataNascimento;
    colunaEmail.innerHTML = hospede.email;

    colunaEndereco.innerHTML = `${hospede?.endereco?.rua}, ${hospede?.endereco?.numero} - ${hospede?.endereco?.bairro}. ${hospede?.endereco?.cidade} - ${hospede?.endereco?.estado}`;
    colunaTelefone.innerHTML = telefone(hospede);
    colunaEntrada.innerHTML = hospede.entrada;
    colunaSaida.innerHTML = hospede.saida;
    colunaAcao.innerHTML = hospede.acao;

    //setAtrribute adiciona um novo atributo ou modifica ou atributo existente

    botaoExcluir.setAttribute('type', 'button');
    botaoExcluir.setAttribute('value', 'Deletar');

    botaoEditar.setAttribute('type', 'button');
    botaoEditar.setAttribute('value', 'Editar');

    botaoExcluir.addEventListener('click', (evt) => {
        showModal(function () {
            console.log(evt.target);
            remove(colunaId.innerHTML)
        })
    });


    //adicionado um evento de click no botão editar
    //ao clicar, abre o modal de editar e ao clicar no botão Atualizar chama a função update
    //variável editarBtn = 
    //
    botaoEditar.addEventListener('click', (evt) => {

        showModalEditar(function () {
            console.log(evt.target);
            update();
        })

        let editarBtn = evt.target;

        let parentRow = editarBtn.closest('tr');

        let hospede = JSON.parse(parentRow.getAttribute('data-rowinfo'));

        console.log(hospede);
        mostrarDados(hospede);
    });

    return [
        colunaId,
        colunaNome,
        colunaCpf,
        colunaDataNascimento,
        colunaEmail,
        colunaEndereco,
        colunaTelefone,
        colunaEntrada,
        colunaSaida,
        botaoEditar,
        botaoExcluir,
    ];
}

//mostrar dados cadastrados no dbeaver na tela 
//através do for feito vai acrescentando cada linha na tabela
function insertDataIntoTable(tableId, hospedes) {
    for (let hospede of hospedes) {
        let row = createRow(hospede);

        document.getElementById(tableId).appendChild(row);
    }
}

let modalWrap = null;

const showModal = (callback) => {
    if (modalWrap !== null) {
        modalWrap.remove();
    }

    modalWrap = document.createElement('div');
    modalWrap.innerHTML = `
    <div class="modal fade" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-light">
          <h5 class="modal-title">Excluir hóspede</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Deseja excluir o hóspede?</p>
        </div>
        <div class="modal-footer bg-light">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Não</button>
          <button type="button" class="btn btn-primary modal-success-btn" data-bs-dismiss="modal">Sim</button>
        </div>
      </div>
    </div>
  </div>
    `;

    modalWrap.querySelector('.modal-success-btn')
        .addEventListener('click', callback);

    document.body.append(modalWrap);

    let modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
    modal.show();
}

let modalEditar = null;

const showModalEditar = (callback) => {

    modalEditar = document.createElement('div');
    modalEditar.innerHTML = `
    <div class="modal fade" tabindex="-1">
    <div class="modal-dialog">
    <div class="modal-content">
    <div class="modal-header bg-light">
    <h5 class="modal-title">Alterar dados do hóspede</h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" onblur="atualizarPagina()" aria label="Close"></button>
    </div>
    <div class="modal-body">
    <p>Digite os dados:<p>
    <form>
    <div class="mb-3">

    <h5>Dados Pessoais</h5>

    <label for="message-text" class="col-form-label">Nome:</label>
    <input type="text" class="form-control" id="nome">

    <label for="cpf" class="col-form-label">Cpf:</label>
    <input type="text" class="form-control" id="cpf"><br>

    <label for="floatingInputGrid" class="col-form-label">Data de Nascimento:</label>
    <input type="date" class="form-control" id="meeting_time_data"><br>

    <label for="floatingInput" class="col-form-label">E-mail:</label>
    <input type="email" class="form-control" id="floatingInputEmail"><br>

    <h5>Endereço</h5>

    <label for="cep" class="col-form-label">Cep:</label>
    <input type="text" class="form-control" id="cep">

    <label for="rua" class="col-form-label">Rua:</label>
    <input type="text" class="form-control" id="rua">

    <label for="numero" class="col-form-label">Numero:</label>
    <input type="text" class="form-control" id="numero">

    <label for="bairro" class="col-form-label">Bairro:</label>
    <input type="text" class="form-control" id="bairro">

    <label for="cidade" class="col-form-label">Cidade:</label>
    <input type="text" class="form-control" id="cidade">

    <label for="estado" class="col-form-label">Estado:</label>
    <input type="text" class="form-control" id="estado"><br>

    <h5>Telefone</h5>

    <div id="telefones"; >
    ${createTelefoneHtml()}
    
 </div>

    <h5>Horário</h5>

    <label for="floatingInputGrid" class="col-form-label">Entrada:</label>
    <input type="datetime-local" class="form-control" id="meeting_time">

    <label for="floatingInputGrid" class="col-form-label">Saida:</label>
    <input type="datetime-local" class="form-control" id="meeting_time_saida">

    </div>
    </form>

    <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
    <button type="button" id="btnAdicionar" class="btn btn-primary modal-success-btn" data-bs-dismiss="modal">Atualizar</button>

    </div>
    </div>
    </div>
    `;

    modalEditar.querySelector('.modal-success-btn')
        .addEventListener('click', callback);

    document.body.append(modalEditar);


    let modal2 = new bootstrap.Modal(modalEditar.querySelector('.modal'));
    modal2.show(1);
}


let modalMensagem = null;

const showModalMensagem = (callback) => {

    modalMensagem = document.createElement('div');
    modalMensagem.innerHTML = `
    <div class="modal fade" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-light">
          <h5 class="modal-title">Cadastro Hóspede</h5>
          <button onblur="atualizarPagina()" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Hóspede atualizado com sucesso!!</p>
        </div>
        <div class="modal-footer bg-light">
          <button type="button" onclick="atualizarPagina()" class="btn btn-primary modal-success-btn" data-bs-dismiss="modal">Ok</button>
        </div>
      </div>
    </div>
  </div>
    `;

    modalMensagem.querySelector('.modal-success-btn')
        .addEventListener('click', callback);

    document.body.append(modalMensagem);

    let modalNotificacao = new bootstrap.Modal(modalMensagem.querySelector('.modal'));
    modalNotificacao.show();
}

let modalMensagemExclui = null;

const showModalExclui = (msg, callback) => {

    modalMensagemExclui = document.createElement('div');
    modalMensagemExclui.innerHTML = `
    <div class="modal fade" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-light">
          <h5 class="modal-title">Excluir Hóspede</h5>
          <button onblur="atualizarPagina()" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>${msg}</p>
        </div>
        <div class="modal-footer bg-light">
          <button type="button" onclick="atualizarPagina()" class="btn btn-primary modal-success-btn" data-bs-dismiss="modal">Ok</button>
        </div>
      </div>
    </div>
  </div>
    `;

    modalMensagemExclui.querySelector('.modal-success-btn')
        .addEventListener('click', callback);

    document.body.append(modalMensagemExclui);

    let modalNotificacao = new bootstrap.Modal(modalMensagemExclui.querySelector('.modal'));
    modalNotificacao.show();
}

function atualizarPagina() {
    location.reload();
}


