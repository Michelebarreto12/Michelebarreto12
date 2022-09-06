let counter = 0;

function adicionarTelefone() {

    const telefoneContainer = document.getElementById("telefones-container");

    const telefoneContainerChildrenCount = telefoneContainer.childElementCount;

    let telefone = `<div id="telefone-${telefoneContainerChildrenCount + 1}">

    <div class="row g-3">

    <div class="col-md-4">
        <div class="col-sm-7">
            <div class="form-floating">
                <input type="text" class="form-control" id="codigoPais"
                    placeholder="Codigo do País" name="codigoPais" required>
                <label for="codigoPais">Codigo do País:</label>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="col-sm-6">
            <div class="form-floating">

                <input type="text" class="form-control" id="ddd" placeholder="DDD"
                    name="ddd" required>
                <label for="ddd">DDD:</label>
            </div>
        </div>
    </div>

    <div class="col-md-4">
        <div class="col-sm-11">
            <div class="form-floating">

                <input type="text" class="form-control" id="numeroTelefone"
                    placeholder="Número do telefone" name="numeroTelefone" required>
                <label for="numeroTelefone">Número:</label>

                <div style="display:flex; justify-content: flex-end;">
                <button style="margin-top: auto;" onclick="deletarTelefone(this)" type="button"
                    class="btn btn-danger btn-sm">
                    <i class="bi bi-trash-fill"></i>
                </button>
            </div>
        </div>              
        </div><br>
    </div>
       
`;
    telefoneContainer.insertAdjacentHTML('beforeend', telefone);
}


function deletarTelefone() {

    const telefone = document.getElementById("telefones-container");
    if (telefone.hasChildNodes()) {
        telefone.removeChild(telefone.children[2]);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Cleave('#cpf', {
        delimiters: ['.', '.', '-'],
        blocks: [3, 3, 3, 2],
        uppercase: true
    });
});

document.addEventListener('DOMContentLoaded', () => {
    new Cleave('#cep', {
        delimiters: ['-'],
        blocks: [5, 3],
        uppercase: true
    });
});


function pesquisacep() {

    let spinner = document.getElementById('spinner');

    document.getElementById('rua').disabled = true;
    document.getElementById('bairro').disabled = true;
    document.getElementById('cidade').disabled = true;
    document.getElementById('uf').disabled = true;

    document.getElementById('spinner').disabled = true;

    const cep = document.querySelector("input[name=cep]");

    cep.addEventListener('blur', e => {
        const value = cep.value;

        spinner.style = "display:block;"

        fetch(`https://viacep.com.br/ws/${value}/json/`, {
            method: 'GET',
            headers: {
                'Content-type': 'apllication/json'
            },

        })
            .then(response => response.json())
            .then(json => {

                document.getElementById('rua').disabled = false;
                document.getElementById('bairro').disabled = false;

                spinner.style = "display: none;"

                if (json.cep) {
                    document.querySelector('input[name=rua]').value = json.logradouro;
                    document.querySelector('input[name=bairro]').value = json.bairro;
                    document.querySelector('input[name=cidade]').value = json.localidade;
                    document.querySelector('input[name=estado]').value = json.uf;
                }
            });
    });
    limparDados();
}

function limparDados() {
    document.getElementById('rua').value = "";
    document.getElementById('bairro').value = "";
    document.getElementById('numero').value = "";
    document.getElementById('cidade').value = "";
    document.getElementById('uf').value = "";
}


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
    });

// função para criar o hóspede
// primeiro foi criado variaveis para cada dado atribuindo document.getElementById que vai pegar o id que foi
// atribuido no html para cada input
// no caso do endereço foi colocado dentro de um array pois é como está feito na api 

// Depois foi feito o fetch para efetuar o cadastro 
// O  JSON.stringify converte valores em javascript para uma String JSON. 

// if (dataNascimentoHospede >= entradaHospede) {

// }


function create(hospede) {

    let nomeHospede = document.getElementById("floatingInputNome").value;
    let cpfHospede = document.getElementById("cpf").value;
    let dataNascimentoHospede = document.getElementById("meeting_time_data").value;
    let emailHospede = document.getElementById("floatingInputEmail").value;

    let entradaHospede = document.getElementById("meeting_time").value;
    let saidaHospede = document.getElementById("meeting_time_saida").value;

    let enderecoHospede = {
        cep: document.getElementById("cep").value,
        rua: document.getElementById("rua").value,
        bairro: document.getElementById("bairro").value,
        numero: document.getElementById("numero").value,
        cidade: document.getElementById("cidade").value,
        estado: document.getElementById("uf").value,
    };

    let telefoneHospede = [{
        codigoPais: document.getElementById("codigoPais").value,
        ddd: document.getElementById("ddd").value,
        numeroTelefone: document.getElementById("numeroTelefone").value
    }];


    // if (dataNascimentoHospede >= entradaHospede) {

       let myAlert = document.getElementById('myAlert');

       document.getElementById('myAlert').disabled = false;

        myAlert.style = "display:block;"

        // alert('Data de nascimento não pode ser maior que a data de entrada');
    //}

    if (entradaHospede > saidaHospede) {
        alert('Entrada não pode ser maior que saída');
    } else {

        fetch(`http://api.teste.local/api/hospede`, {
            method: "POST",
            headers: {
                'Content-type': 'apllication/json'
            },
            body: JSON.stringify(
                {
                    nome: nomeHospede, cpf: cpfHospede, dataNascimento: dataNascimentoHospede,
                    email: emailHospede, entrada: entradaHospede, saida: saidaHospede,
                    endereco: enderecoHospede, telefones: telefoneHospede
                }
            )
        })

            .then(response => {
                if (response.ok) {
                    showModalMensagem('Cadastrado com sucesso');
                }
                else {
                    showModalMensagemErro('Erro ao cadastrar hóspede');
                }
                return response
            })
    }
}

let button = document.getElementById('btnCadastrar');

button.addEventListener('click', (evt) => {
    showModalCreate(function () {
        console.log(evt)
        create();
    })
})



// Criado um modal para cadastro do hóspede
// modal-content significa a area que está aparecendo mais clara
// modal-header é o cabeçalho do modal, o bg-light é a cor 
// modal-title é o titulo
// Criado um botao com classe btn-close que é o X para fechar
// data-bs-dismiss="modal" serve para fechar o modal ao clicar no X ou fora da tela

let modalCreate = null;
const showModalCreate = (callback) => {

    modalCreate = document.createElement('div');
    modalCreate.innerHTML = ` 
    <div class="modal fade" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-light">
          <h5 class="modal-title">Cadastro de Hóspede</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Deseja cadastrar o hóspede?</p>
        </div>
        <div class="modal-footer bg-light">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Não</button>
          <button type="submit" class="btn btn-primary modal-success-btn" data-bs-dismiss="modal">Sim</button>
        </div>
      </div>
    </div>
  </div>
      `;

    modalCreate.querySelector('.modal-success-btn')
        .addEventListener('click', callback);

    document.body.append(modalCreate);

    let modal = new bootstrap.Modal(modalCreate.querySelector('.modal'));
    modal.show();
}

let modalMensagem = null;

const showModalMensagem = (msg, callback) => {

    modalMensagem = document.createElement('div');
    modalMensagem.innerHTML = `
    <div class="modal fade" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-light">
          <h5 class="modal-title">Cadastro Hóspede</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Hóspede cadastrado com sucesso</p>
        </div>
        <div class="modal-footer bg-light">
          <button type="button" class="btn btn-primary modal-success-btn" data-bs-dismiss="modal">Ok</button>
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

let modalMensagemErro = null;

const showModalMensagemErro = (callback) => {

    modalMensagemErro = document.createElement('div');
    modalMensagemErro.innerHTML = `
    <div class="modal fade" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-light">
          <h5 class="modal-title">Cadastro Hóspede</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Erro ao cadastrar o hóspede</p>
        </div>
        <div class="modal-footer bg-light">
          <button type="button" class="btn btn-primary modal-success-btn" data-bs-dismiss="modal">Ok</button>
        </div>
      </div>
    </div>
  </div>
    `;

    modalMensagemErro.querySelector('.modal-success-btn')
        .addEventListener('click', callback);

    document.body.append(modalMensagemErro);

    let modalNotificacaoErro = new bootstrap.Modal(modalMensagemErro.querySelector('.modal'));
    modalNotificacaoErro.show();
}

function atualizarPagina() {
    location.reload();
}