const produto = document.getElementById('produtos'); // categoria
const bebida = document.getElementById('bebidas');
const combo = document.getElementById('combos');
const mesa = document.getElementById('mesa');
const nome = document.getElementById('nome');
const comentario = document.getElementById('comentarios');
const btn = document.getElementById('botao');
const btnAdicionar = document.getElementById('botaoAdicionar');
const btnRemover = document.getElementById('botaoRemover');
const gridProdutos = document.getElementById('gridProdutos').getElementsByTagName('tbody')[0];
let produtosGlobal = []

document.addEventListener('DOMContentLoaded', () => {    

    btn.addEventListener('click', () =>{        
        enviarDados();        
        console.log('=====TO AQUI');
    });

    produto.addEventListener('change', () => {
        console.log('ta mudou estado');
        chamaDados();
    });

    btnAdicionar.addEventListener('click', () => {
        const produtoSelecionado = produto.options[produto.selectedIndex].text;
        //const bebidaSelecionada = bebida.options[bebida.selectedIndex].text;

        if(produtoSelecionado != "Selecione..." || bebidaSelecionada != "Selecione..."){
            //adicionarProduto();
            adicionarBebida();  
        } else {
            alert("Selecione um produto ou bebida.");
        }
    });

    btnRemover.addEventListener('click', () => {
        removerLinhasSelecionadas();
    });

    abrirPagina();
});

function enviarDados(){
    console.log('ENTREI AQUI')
    const Url = 'http://localhost:3000'; // Altere o URL conforme necessário    
    console.log(bebida.value)

    const table = document.getElementById('gridProdutos');
    const tbody = table.getElementsByTagName('tbody')[0];
    const rows = tbody.getElementsByTagName('tr');

    const pedidoJson = {
        mesa: mesa.value,
        cliente: {
            nome: nome.value,
            produtos: [],
            bebidas: [],
            comentarios: []
        }

    }

    for(let i = 0; i < rows.length; i++){
        console.log('nome produto na tabela')
        const row = rows[i];
        console.log(row.getElementsByTagName('td')[1].textContent)

        const produtoGlobalEncontrado = produtosGlobal.find(produto => 
            produto.produto === row.getElementsByTagName('td')[1].textContent
        );
        console.log('prodtuto global encontrado')
        console.log(produtoGlobalEncontrado)
        if(produtoGlobalEncontrado.categoria == "comida") {
            pedidoJson.cliente.produtos.push(produtoGlobalEncontrado._id)
        } else {
            pedidoJson.cliente.bebidas.push(produtoGlobalEncontrado._id)
        }
    }
    console.log('pedido JSON')
    console.log(pedidoJson)        
    
    axios.post(`${Url}/comandas`, pedidoJson)
        .then((response) => {
            console.log('Resposta do servidor:', response.data);
            alert('Pedido enviado com sucesso!');
        })
        .catch((error) => {
            console.error('Erro ao enviar pedido:', error);
            alert('Erro ao enviar pedido. Por favor, tente novamente mais tarde.');
        });
}

function abrirPagina(){
    const Url = 'http://localhost:3000';
    
    const comida = document.getElementById('produtos');
    const bebida = document.getElementById('bebidas');
    //const combo = document.getElementById('combos');
    
    const categoria = comida.value;
    
    axios.get(Url+'/produtos')
        .then((response) => {
            const dados = response.data;
            
            produtosGlobal = dados;
            console.log('produtos global') 
            console.log(produtosGlobal)

            if(dados.length > 0){
                dados.forEach(item => {
                    if(item.categoria == categoria){
                        const option = document.createElement('option');
                        option.value = item._id;
                        option.textContent = `${item.produto} - Valor: R$${item.valor.toFixed(2)}`;
                        console.log("chegou");
                        bebida.appendChild(option);
                    }
                });
            } else {
                const option = document.createElement('option');
                option.value = '';
                option.textContent = 'sem produtos cadastrados';
                comida.appendChild(option);
            }
        })
        .catch((error) => {
            console.error('erro na recuperação de dados:', error);
            // Adicionar uma opção de erro
            comida.innerHTML = '<option value="">Error</option>';
        });
}

function chamaDados(){
    var select = document.getElementById('bebidas');
    while (select.options.length > 0) {
        select.remove(0);
    }

    const Url = 'http://localhost:3000';
    
    const comida = document.getElementById('produtos');
    const bebida = document.getElementById('bebidas');
    //const combo = document.getElementById('combos');
    
    const categoria = comida.value;
    
    axios.get(Url+'/produtos')
        .then((response) => {
            const dados = response.data;
            
            if(dados.length > 0){
                dados.forEach(item => {
                    if(item.categoria == categoria){
                        const option = document.createElement('option');
                        option.value = item._id;
                        option.textContent = `${item.produto} - Valor: R$${item.valor.toFixed(2)}`;
                        console.log("chegou");
                        bebida.appendChild(option);
                    }
                });
            } else {
                const option = document.createElement('option');
                option.value = '';
                option.textContent = 'sem produtos cadastrados';
                comida.appendChild(option);
            }
        })
        .catch((error) => {
            console.error('erro na recuperação de dados:', error);
            // Adicionar uma opção de erro
            comida.innerHTML = '<option value="">Error</option>';
        });
}

function adicionarProduto() {
    const produtoSelecionado = produto.options[produto.selectedIndex].text;
    var arrayLinhaProdutoSelecionado = produtoSelecionado.split(' ');
    console.log(arrayLinhaProdutoSelecionado);
    console.log(produtoSelecionado);
    if (produtoSelecionado != "Selecione...") {
        // Extrai o nome do produto e o valor usando uma expressão regular
        const produtoMatch = produtoSelecionado.match(/^(.+?) - Valor: R\$(\d+\.\d{2})$/);

        if (!produtoMatch) {
            alert('Formato do produto inválido. Certifique-se de que o formato é "Produto - Valor: R$XX,XX".');
            return;
        }

        const nomeProduto = produtoMatch[1].trim();
        const valorProduto = produtoMatch[2];

        const novaLinha = document.createElement('tr');

        const colunaCheckbox = document.createElement('td');
        const inputCheckbox = document.createElement('input');
        inputCheckbox.type = 'checkbox';
        inputCheckbox.name = 'selecionar';
        colunaCheckbox.appendChild(inputCheckbox);

        const colunaNome = document.createElement('td');
        colunaNome.textContent = nomeProduto;

        const colunaPreco = document.createElement('td');
        colunaPreco.textContent = `R$ ${parseFloat(valorProduto).toFixed(2)}`;

        novaLinha.appendChild(colunaCheckbox);
        novaLinha.appendChild(colunaNome);
        novaLinha.appendChild(colunaPreco);

        document.querySelector('#gridProdutos tbody').appendChild(novaLinha);
    }
}

function adicionarBebida() {
    const bebidaSelecionada = bebida.options[bebida.selectedIndex].text;
    console.log(bebidaSelecionada);
    if (bebidaSelecionada != "Selecione...") {
        // Extrai o nome do produto e o valor usando uma expressão regular
        const bebidaMatch = bebidaSelecionada.match(/^(.+?) - Valor: R\$(\d+\.\d{2})$/);

        if (!bebidaMatch) {
            alert('Formato do produto inválido. Certifique-se de que o formato é "Produto - Valor: R$XX,XX".');
            return;
        }

        const nomeBebida = bebidaMatch[1].trim();
        const valorBebida = bebidaMatch[2];

        const novaLinha = document.createElement('tr');

        const colunaCheckbox = document.createElement('td');
        const inputCheckbox = document.createElement('input');
        inputCheckbox.type = 'checkbox';
        inputCheckbox.name = 'selecionar';
        colunaCheckbox.appendChild(inputCheckbox);

        const colunaNome = document.createElement('td');
        colunaNome.textContent = nomeBebida;

        const colunaPreco = document.createElement('td');
        colunaPreco.textContent = `R$ ${parseFloat(valorBebida).toFixed(2)}`;

        novaLinha.appendChild(colunaCheckbox);
        novaLinha.appendChild(colunaNome);
        novaLinha.appendChild(colunaPreco);

        document.querySelector('#gridProdutos tbody').appendChild(novaLinha);
    }
}

function removerLinhasSelecionadas() {
    const table = document.getElementById('gridProdutos');
    const tbody = table.getElementsByTagName('tbody')[0];
    const rows = tbody.getElementsByTagName('tr');
    
    for (let i = rows.length - 1; i >= 0; i--) {
        const row = rows[i];
        const checkbox = row.getElementsByTagName('input')[0];
        if (checkbox.checked) {
            tbody.removeChild(row);
        }
    }
}
