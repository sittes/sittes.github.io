// Variável global que busca o elemento do "visor" - input readonly do HTML
let inputResultado = document.getElementById("inputCalculadora");
// Objeto que registra os valores e funções do cálculo
let calculo = {
 valorSalvo: null,
 funcaoParaCalcular: null
};
//Ao carregar a página, atribui eventos aos botões por meio dos seus identificadores (ids)
window.addEventListener("load", function () {
 atribuirEventos();
})
function atribuirEventos() {
 //Atribui eventos aos números
 document.getElementById("btnValor0").addEventListener("click", inserirNumero);
 document.getElementById("btnValor1").addEventListener("click", inserirNumero);
 document.getElementById("btnValor2").addEventListener("click", inserirNumero);
 document.getElementById("btnValor3").addEventListener("click", inserirNumero);
 document.getElementById("btnValor4").addEventListener("click", inserirNumero);
 document.getElementById("btnValor5").addEventListener("click", inserirNumero);
 document.getElementById("btnValor6").addEventListener("click", inserirNumero);
 document.getElementById("btnValor7").addEventListener("click", inserirNumero);
 document.getElementById("btnValor8").addEventListener("click", inserirNumero);
 document.getElementById("btnValor9").addEventListener("click", inserirNumero);
 //Atribui eventos aos botões de operadores, ponto e resultado
 document.getElementById("btnPonto").addEventListener("click", inserirNumero);
 document.getElementById("btnSoma").addEventListener("click", clicarOperador);
 document.getElementById("btnDividir").addEventListener("click", clicarOperador);
 document.getElementById("btnMultiplicar").addEventListener("click", clicarOperador);
 document.getElementById("btnSubtrair").addEventListener("click", clicarOperador);
 document.getElementById("btnLimpar").addEventListener("click", limparDados);
 document.getElementById("btnResultado").addEventListener("click", clicarResultado)

}
// Adiciona o número no visor
function inserirNumero() {
 // Se o valor não for um número, substitui pelo valor do conteúdo do botão
 if (isNaN(inputResultado.value)) {
 inputResultado.value = event.target.textContent;
 // Senão, adiciona o valor aos demais
 } else {
 // Se o valor for zero, substitui o valor do visor pelo número clicado
 if (inputResultado.value == 0) {
 inputResultado.value = event.target.textContent;
 // Senão adiciona o número aos digitos no visor
 } else {
 inputResultado.value += event.target.textContent;
 }
 }
}
//Operação de soma
function somar(valor1, valor2){
 return valor1 + valor2;
}
//Operação de subtração
function subtrair(valor1, valor2){
 return valor1 - valor2;
}
//Operação de multiplicacao
function multiplicar(valor1, valor2){
 return valor1 * valor2;
}
//Operação de divisão
function dividir(valor1, valor2){
 if(valor2 === 0){
 return "Erro, não é possível dividir um número por zero!";
 }else{
 return valor1 / valor2;
 }
}
// Limpa o visor e os dados do cálculo
function limparDados() {
 inputResultado.value = "";
 calculo.valorSalvo = null;
 calculo.funcaoParaCalcular = null;
}
// Insere o ponto para casas decimais
function inserirPonto(){
 if(inputResultado.value === "" || isNaN(inputResultado.value)){
 inputResultado.value = "0.";
 }else if(!inputResultado.value.includes(".")){
 inputResultado.value = inputResultado.value + ".";
 }
}
//Atribui a função de acordo com o tipo de operador clicado
function atribuirOperacao(operador){
 if(operador === "+"){
 calculo.funcaoParaCalcular = somar;
 } else if(operador === "-"){
 calculo.funcaoParaCalcular = subtrair;
 } else if(operador === "*"){
 calculo.funcaoParaCalcular = multiplicar;
 } else {
 calculo.funcaoParaCalcular = dividir;
 }
}
//Atualiza valores de cálculo
function clicarOperador() {
 if(!isNaN(inputResultado.value)){
 if(calculo.valorSalvo == null){
 calculo.valorSalvo = Number(inputResultado.value);
 }else if(calculo.funcaoParaCalcular != null){
 calculo.valorSalvo = calculo.funcaoParaCalcular(calculo.valorSalvo,
Number(inputResultado.value));
 }
 }
 let operador = event.target.textContent;
 atribuirOperacao(operador);
 inputResultado.value = operador;
}
//Exibe resultado no visor
function clicarResultado() {
 if(!isNaN(inputResultado.value) && calculo.funcaoParaCalcular != null){
 let resultado = calculo.funcaoParaCalcular(calculo.valorSalvo,
Number(inputResultado.value));
 inputResultado.value = resultado;
 calculo.valorSalvo = resultado;
 calculo.funcaoParaCalcular = null;
 }
}

//relogio da calculadora
function clock() {// We create a new Date object and assign it to a variable called "time".
    var time = new Date(),
        
        // Access the "getHours" method on the Date object with the dot accessor.
        hours = time.getHours(),
        
        // Access the "getMinutes" method with the dot accessor.
        minutes = time.getMinutes(),
        
        
        seconds = time.getSeconds();
    
    document.querySelectorAll('.clock')[0].innerHTML = harold(hours) + ":" + harold(minutes) + ":" + harold(seconds);
      
      function harold(standIn) {
        if (standIn < 10) {
          standIn = '0' + standIn
        }
        return standIn;
      }
    }
    setInterval(clock, 1000);

 (function timer() {
        'use strict';
    
        //declare
        var output = document.getElementById('timer');
        var toggle = document.getElementById('toggle');
        var clear = document.getElementById('clear');
        var running = false;
        var paused = false;
        var timer;
        
        // timer start time
        var then;
        // pause duration
        var delay;
        // pause start time
        var delayThen;
    
        
        // start timer
        var start = function() {
            delay = 0;
            running = true;
            then = Date.now();
            timer = setInterval(run,51);
            toggle.innerHTML = 'stop';
        };
        
        
        // parse time in ms for output
        var parseTime = function(elapsed) {
            // array of time multiples [hours, min, sec, decimal]
            var d = [3600000,60000,1000,10];
            var time = [];
            var i = 0;
    
            while (i < d.length) {
                var t = Math.floor(elapsed/d[i]);
    
                // remove parsed time for next iteration
                elapsed -= t*d[i];
    
                // add '0' prefix to m,s,d when needed
                t = (i > 0 && t < 10) ? '0' + t : t;
                time.push(t);
                i++;
            }
            
            return time;
        };
        
        
        // run
        var run = function() {
            // get output array and print
            var time = parseTime(Date.now()-then-delay);
            output.innerHTML = time[0] + ':' + time[1] + ':' + time[2] + '.' + time[3];
        };
        
        
        // stop
        var stop = function() {
            paused = true;
            delayThen = Date.now();
            toggle.innerHTML = 'resume';
            clear.dataset.state = 'visible';
            clearInterval(timer);
    
            // call one last time to print exact time
            run();
        };
        
        
        // resume
        var resume = function() {
            paused = false;
            delay += Date.now()-delayThen;
            timer = setInterval(run,51);
            toggle.innerHTML = 'stop';
            clear.dataset.state = '';
        };
        
        
        // clear
        var reset = function() {
            running = false;
            paused = false;
            toggle.innerHTML = 'start';
            output.innerHTML = '0:00:00.00';
            clear.dataset.state = '';
        };
        
        
        // evaluate and route
        var router = function() {
            if (!running) start();
            else if (paused) resume();
            else stop();
        };
        
        toggle.addEventListener('click',router);
        clear.addEventListener('click',reset);
        
    })();
    



