const insertBtn = document.getElementById("insert")
const updateBtn = document.getElementById("update")
const deleteBtn = document.getElementById("delete")
const nomeInput = document.getElementById("nome")
const valorInput = document.getElementById("valor")
const info = document.getElementById('info')
const url = 'http://localhost:3000/usuarios'

mostrarDados()

insertBtn.addEventListener('click', () =>{
    console.log('funcioando')
    enviarDados()
})

updateBtn.addEventListener('click', () =>{
    atualizarDado()
})

deleteBtn.addEventListener('click', () =>{
    deletarDado()
})

function mostrarDados(){


    axios.get(url)
        .then(res => {
            const itens = res.data;
            info.innerHTML = ''
            itens.forEach(item => {
                const itemDiv = document.createElement('div')
                itemDiv.className = 'item-container'
                itemDiv.innerHTML = `
                    <input type="radio" name="item-selecionado" value="${item._id}">
                    <span>${item.login} </span>
                `
                info.appendChild(itemDiv)
            })
            document.querySelectorAll('input[name="selected-item"]').forEach(radio => {
                radio.addEventListener('change', () => {
                    selectedItem = this.value;
                });
            });
        })
        .catch(error => {
            console.error('Erro ao carregar itens:', error);
        });
}

function enviarDados(){

    nome = nomeInput.value
    valor = valorInput.value

    data = {
        login: nome,
        pass: valor
    }

    axios.post(url, data)
        .then((res) => {
            console.log(res.data)
            alert('pedido enviado com sucesso')
            mostrarDados()
            nomeInput.value=''
            valorInput.value=''
        })
        .catch((error) => {
            console.error('Erro ao enviar pedido:', error);
            alert('Erro ao enviar pedido. Por favor, tente novamente mais tarde.');
        });
}

function atualizarDado(){
    const selectedItem = document.querySelector('input[name="item-selecionado"]:checked');
    if (!selectedItem) {
        alert('Por favor, selecione um item para atualizar.');
        return;
    }

    const itemId = selectedItem.value;

    const novoNome = nomeInput.value; 
    const novoValor = valorInput.value;

    // Fazer uma requisição GET para obter os dados do item selecionado
    axios.get(`${url}/${itemId}`)
        .then(response => {
            const itemSelecionado = response.data;
            
            // Obter os valores atuais do item selecionado
            const nomeAtual = itemSelecionado.login;
            const valorAtual = itemSelecionado.valor.toFixed(2);

            // Verificar se os campos de entrada estão vazios e, se estiverem, manter os valores atuais
            const nomeFinal = novoNome === '' ? nomeAtual : novoNome;
            const valorFinal = novoValor === '' ? valorAtual : novoValor;

            // Criar o objeto de dados atualizados
            const dataAtualizada = {
                login: nomeFinal,
                pass: valorFinal
            };

            // Enviar os dados atualizados para o servidor
            return axios.put(`${url}/${itemId}`, dataAtualizada);
        })
        .then(() => {
            alert('Item atualizado com sucesso');
            mostrarDados();

            
            nomeInput.value=''
            valorInput.value=''
        })
        .catch((error) => {
            console.error('Erro ao atualizar item:', error);
            alert('Erro ao atualizar item. Por favor, tente novamente mais tarde.');
        });
}

function deletarDado(){
    const selectedItem = document.querySelector('input[name="item-selecionado"]:checked');
    if (!selectedItem) {
        alert('Por favor, selecione um item para excluir.');
        return;
    }

    const itemId = selectedItem.value;

    axios.delete(`${url}/${itemId}`)
        .then(() => {
            alert('Item excluído com sucesso');
            mostrarDados();
        })
        .catch((error) => {
            console.error('Erro ao excluir item:', error);
            alert('Erro ao excluir item. Por favor, tente novamente mais tarde.');
        });
}