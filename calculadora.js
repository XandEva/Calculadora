
const display = document.getElementById('display');
const operadores = document.querySelectorAll('[id*=operador]'); /*selecione os id's chamado operador*/ 
const numeros = document.querySelectorAll('[id*=tecla]');

let novoNumero = true;
let operador;
let numeroAnterior;

const operacaoPendente = () => operador !== undefined;

const calcular = () =>{
    if(operacaoPendente()){
        const numeroAtual = parseFloat(display.textContent.replace(',','.'));
        novoNumero = true;
        const resultado = eval (`${numeroAnterior}${operador}${numeroAtual}`); /*numero + operador + numero e ele faz a conta */
        atualizarDisplay(resultado)
    }
}

const atualizarDisplay = (texto) => {
    if(novoNumero){
        display.textContent = texto.toLocaleString('BR');
        novoNumero = false
    }else{
        display.textContent += texto.toLocaleString('BR');/*vai receber um texto qlquer e p += é pq vai concatenar e nn substituir */
    }
       

}
const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);
numeros.forEach (numero => numero.addEventListener('click',inserirNumero)); /*foreach varre todo elemento do array */

const selecionarOperador = (evento) => {
    if(!novoNumero){
        calcular()
        novoNumero = true;
        operador = evento.target.textContent; /*armazenei o operador que deve ser realizado */ 
        numeroAnterior = parseFloat(display.textContent.replace(',','.'));
        console.log(operador)
    }


}
operadores.forEach (operador => operador.addEventListener('click',selecionarOperador));

const ativarIgual = ()=> {
    calcular()
    operador = undefined
}
document.getElementById('igual').addEventListener('click', ativarIgual)

const limparDisplay =() => display.textContent = undefined;
document.getElementById('limparDisplay').addEventListener('click', limparDisplay)

const limparCalculo = () =>{
    limparDisplay()
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined
}
document.getElementById('limparCalculo').addEventListener('click', limparCalculo)

const removerUltimoNumero = ()=> display.textContent = display.textContent.slice(0,-1)
document.getElementById('backspace').addEventListener('click', removerUltimoNumero)


const inverterSinal = () =>{
    novoNumero = true
    atualizarDisplay(display.textContent * -1)
} 
document.getElementById('inverter').addEventListener('click', inverterSinal)

const existeDecimal = ()=> display.textContent.indexOf(',') !== -1;
const existeValor = ()=> display.textContent.length >0;
const inserirDecimal = () => {
    if(!existeDecimal()){
        if(existeValor()){
            atualizarDisplay(',')
        }else{
            atualizarDisplay('0,')
        }
    }
}
document.getElementById('decimal').addEventListener('click', inserirDecimal)