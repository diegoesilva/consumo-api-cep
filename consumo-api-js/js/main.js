'use strict';


const limparFormulario = () => { // função para limpar o formulário antes de cada consulta
    document.getElementById('endereco').value = "";
    document.getElementById('bairro').value = "";
    document.getElementById('cidade').value = "";
    document.getElementById('estado').value = "";
}

const preencherFormulario = (arg) => { //função para preencher os campos do formulário quando os dados retornarrem da API ViaCep
    document.getElementById('endereco').value = arg.logradouro;
    document.getElementById('bairro').value = arg.bairro;
    document.getElementById('cidade').value = arg.localidade;
    document.getElementById('estado').value = arg.uf;
};

const enumero = (entrada) => /^[0-9]+$/.test(entrada); // usa *expressões regulares* para verficar se toda a entrada é composta por números

const cepValido = (cep) => cep.length == 8 && enumero(cep); // testa se a entrada tem oito caracteres e chama a função enumero (linha 18) para verificar se todos os caracteres são numéricos


const pesquisarCep = async() => { //principal função do programa. Execulta a consulta à API ViaCep para retornar os dados desejados
    limparFormulario(); // usa a função limparFormulario (linha 4) para apagar os dados de possíveis consultas anteriores
    const cep = document.getElementById('cep').value; //recolhe o valor digitado no campo cep
    const url = `http://viacep.com.br/ws/${cep}/json/`; //utiliza o valor recolhido para acessar a API ViaCep
    if (cepValido(cep)){
        const dados = await fetch(url); // dá um fetch e espera retornar os dados da página
        const endereco = await dados.json(); //espera o retorno do json do fetch capturado
        if (endereco.hasOwnProperty('erro')){ //verifica se o cep exite
            document.getElementById('endereco').value = "CEP não encontrado"; //se o cep não existir, preenche o campo endereço com a mensagem "cep não encontrado" para informar ao usuário
        } else {
            preencherFormulario(endereco) //utiliza os dados armazenados na constante endereco para chamar a função preencherFormulario (linha 11)
        }
    } else {
            document.getElementById('endereco').value = "Entrada inválida"; //se a entrada não for satisfizer as condições definidas anteriormente (conter oito caracteres numérios), informa ao usuário que a entrada é inválida
    }

};
    
document.getElementById('cep').addEventListener('focusout', pesquisarCep); // chama a função prinicipal do programa (pesquisaCep, linha 23) sempre que o campo cep for acessado e posteriormente desacessado.