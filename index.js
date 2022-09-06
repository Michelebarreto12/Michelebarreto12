function myFunction() {
    document.getElementById("teste").innerHTML = "Paragraph changed.";
}

function toCelsius(fahrenheit) {
    return (5 / 9) * (fahrenheit - 32);
}


let text = "The temperature is " + toCelsius(77) + " Celsius";

// let button = document.getElementById('btn');
// console.log(button);

button.addEventListener('click', function (e) {
    alert('clicaram no botão');
});

// var comprasFeitas = false;

// if (comprasFeitas === true) {
//    var granaFilhote = 10;
//  } else {
//    var granaFilhote = 5;
//  }

// foi criado duas variaveis - let é para criar - select e para é o nome da variavel
// document.querySelector retorna o primeiro elemento do documento que no primeiro caso está pegando o weather
// do teste.html
// no segundo caso está retornando p = <p></p>

// depois foi criado a variavel changeHandler com uma função anonima
// em seguida foi criado outra variavel chamada choice(escolha) que recebe o select.value(que são as
// options criada no teste.html)

// depois foi criado uma estrutura de caso; 
// caso a escolha seja sunny, ira retornar a frase 
// textContent representa o conteudo de texto de um nó, no caso ele altera o <p></p> que está em teste.html


// em select.addEventListener registra uma unica espera de evento em um unico alvo

// let select = document.querySelector('select');
// let para = document.querySelector('p');

// select.addEventListener('change', setWeather);
// function setWeather() {
//     var choice = select.value;

// let setWeather = function() {
//     var choice = select.value;

//   switch (choice) {
//     case 'sunny':
//       para.textContent = 'It is nice and sunny outside today. Wear shorts! Go to the beach, or the park, and get an ice cream.';
//       break;
//     case 'rainy':
//       para.textContent = 'Rain is falling outside; take a rain coat and a brolly, and don\'t stay out for too long.';
//       break;
//     case 'snowing':
//       para.textContent = 'The snow is coming down — it is freezing! Best to stay in with a cup of hot chocolate, or go build a snowman.';
//       break;
//     case 'overcast':
//       para.textContent = 'It isn\'t raining, but the sky is grey and gloomy; it could turn any minute, so take a rain coat just in case.';
//       break;
//     default:
//       para.textContent = '';
//   }
// };



// var pessoa = {
//     nome: ['Bob', 'Smith'],
//     idade: 32,
//     sexo: 'masculino',
//     interesses: ['música', 'esquiar'],
//     bio: function() {
//       alert(this.nome[0] + ' ' + this.nome[1] + ' tem ' + this.idade + ' anos de idade. Ele gosta de ' + this.interesses[0] + ' e ' + this.interesses[1] + '.');
//     },
//     saudacao: function() {
//       alert('Oi! Eu sou ' + this.nome[0] + '.');
//     }
//   };

//   var pessoa1 = {
//     nome: 'Chris',
//     saudacao: function() {
//       alert('Oi! Meu nome é ' + this.nome + '.');
//     }
//   }
  
//   var pessoa2 = {
//     nome: 'Brian',
//     saudacao: function() {
//       alert('Oi! Meu nome é ' + this.nome + '.');
//     }
//   } 