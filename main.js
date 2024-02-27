const form = document.getElementById("form-atividade");
const imgAprovado = `<img src="./images/aprovado.png" alt="emoji celebrando">`;
const imgReprovado = `<img src="./images/reprovado.png" alt="emoji decepcionado">`;

const atividades = [];
const notas = [];
const spanAprovado = `<span class="resultado aprovado">aprovado</span>`;
const spanReprovado = `<span class="resultado reprovado">reprovado</span>`;
let notaMinima = +Number(prompt("Digite a nota mínima: "));

let linhas = "";

form.addEventListener("submit", function(e) {
    e.preventDefault();

    adicionaLinha();
    atualizaTabela();
    atualizaMediaFinal();

});

function adicionaLinha() {
    const inputNomeAtividade = document.getElementById("nome-atividade");
    const inputNotaAtividade = document.getElementById("nota-atividade");
    if(atividades.includes(inputNomeAtividade.value.toString().trim()) || validateInput(inputNomeAtividade) || validateInput(inputNotaAtividade) ){
        alert(`A atividade ${inputNomeAtividade.value.toString().trim()} já foi inserida`);
    } else {
        atividades.push(inputNomeAtividade.value.toString().trim());
        notas.push(+inputNotaAtividade.value);
    
        let linha = `<tr>`;
        linha += `<td>${inputNomeAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value} </td>`;
        linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`;
        linha += `</tr>`;
    
        linhas += linha;
    }

    inputNomeAtividade.value = "";
    inputNotaAtividade.value = "";
}

function atualizaTabela() {
    const corpoTabela = document.querySelector("tbody");
    corpoTabela.innerHTML = linhas;
}

function atualizaMediaFinal() {
    const mediaFinal = calculaMediaFinal();
    
    document.getElementById("media-final-valor").innerHTML = mediaFinal;
    document.getElementById("media-final-resultado").innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;

}

function calculaMediaFinal  () {
    let somaDasNotas = 0;

    for(let i = 0; i < notas.length; i++) {
        somaDasNotas += notas[i];
    }

    return somaDasNotas / notas.length;
}

//previnição básica contra XSS
function validateInput(input) {
    let invalid = input.value.toString().includes("<") ||
    input.value.toString().includes(" >") ||
    input.value.toString().includes("script") ||
    input.value.toString().includes("&") ||
    input.value.toString().includes("%")  ? true : false;
    
    return invalid;
}

