function detalharComanda(cliente, mesaNumero) {
    axios.get(`http://localhost:3000/comandas/${mesaNumero}`)
        .then(response => {
            const despesas = response.data; // Lista com o nome e o valor total de cada cliente
            console.log('DESPESAS');
            console.log(despesas);

            for (const despesa of despesas) {
                if (despesa.nome === cliente) {                                    
                    console.log('Vai imprimir os produtos');

                    // Cria uma nova tabela
                    const tabela = document.createElement('table');
                    const cabecalho = tabela.createTHead();
                    const linhaCabecalho = cabecalho.insertRow(0);

                    // Cria as colunas "produto" e "preco"
                    const colunaProduto = linhaCabecalho.insertCell(0);
                    const colunaPreco = linhaCabecalho.insertCell(1);
                    colunaProduto.textContent = 'Produto';
                    colunaPreco.textContent = 'Preço';

                    // Percorre os produtos e insere os dados na tabela
                    for (const produto of despesa.produtos) {
                        const linha = tabela.insertRow();
                        const celulaProduto = linha.insertCell(0);
                        const celulaPreco = linha.insertCell(1);

                        celulaProduto.textContent = produto.produto;
                        celulaPreco.textContent = produto.valor;
                    }

                    // Insere a tabela no elemento com ID "mesa-despesas-detalhada"
                    const detalhesMesa = document.getElementById('mesa-despesas-detalhada');
                    detalhesMesa.innerHTML = ''; // Limpa qualquer conteúdo existente
                    detalhesMesa.appendChild(tabela);
                    console.log('MONTOU');

                    // Abre o modal após montar a tabela
                    const modalDetalhes = document.getElementById('modal-detalhes');
                    modalDetalhes.style.display = 'flex';

                    break; // Se você quer parar após encontrar o cliente
                }
            }
        })
        .catch(error => {
            modalDespesas.textContent = 'Não há comandas vinculadas a esta mesa';
            console.error('Erro ao recuperar despesas da mesa:', error);
        });
}
        
        // Função para abrir o modal com as despesas da mesa
        function abrirModal(mesaNumero) {
            const modal = document.getElementById('modal');
            const modalMesaNumero = document.getElementById('mesa-numero');
            const modalDespesas = document.getElementById('mesa-despesas');
        
            // Atualiza o número da mesa no modal
            modalMesaNumero.textContent = mesaNumero;
        
            // Faz uma requisição para o backend para obter os detalhes da comanda
            axios.get(`http://localhost:3000/comandas/${mesaNumero}`)
                .then(response => {
                    const despesas = response.data; // Lista com o nome e o valor total de cada cliente
                    console.log(despesas);
                    // Calcula o total das despesas da mesa
                    if (despesas.message) {
                        modalDespesas.textContent = despesas.message;
                    } else {
                        // Limpa o conteúdo anterior do modalDespesas
                        modalDespesas.innerHTML = '';
        
                        // Itera sobre cada cliente e cria uma linha para cada um com um link
                        despesas.forEach(cliente => {
                            const linha = document.createElement('div');
                            linha.classList.add('cliente-item');
        
                            const checkbox = document.createElement('input');
                            checkbox.type = 'checkbox';
                            checkbox.value = cliente.nome;
                            checkbox.classList.add('cliente-checkbox');
        
                            const texto = document.createElement('a');
                            texto.href = '#';
                            texto.textContent = `${cliente.nome}: R$${cliente.valorTotal.toFixed(2)}`;
        
                            // Adiciona evento de clique ao link
                            texto.addEventListener('click', (event) => {
                                event.preventDefault(); // Evita o comportamento padrão do link
                                detalharComanda(cliente.nome, mesaNumero); // Chama a função exemplo com o nome do cliente
                            });
        
                            linha.appendChild(texto);
                            linha.appendChild(checkbox);
                            linha.style.display = 'flex';
                            linha.style.justifyContent = 'space-around';
                            linha.style.marginBottom = '10px';
                            modalDespesas.appendChild(linha);
                        });
        
                        // Calcula o total das despesas da mesa
                        let totalDespesas = despesas.reduce((total, cliente) => total + cliente.valorTotal, 0);
        
                        // Cria uma linha para o total das despesas
                        const linhaTotal = document.createElement('p');
                        linhaTotal.textContent = `Total: R$${totalDespesas.toFixed(2)}`;
                        modalDespesas.appendChild(linhaTotal);
                    }
                })
                .catch(error => {
                    modalDespesas.textContent = 'Não há comandas vinculadas a esta mesa';
                    console.error('Erro ao recuperar despesas da mesa:', error);
                })
                .finally(() => {
                    // Exibe o modal após a requisição (caso tenha ocorrido algum erro, o modal não será exibido)
                    modal.style.display = 'flex'; // Define o estilo display como flex
                });
        }

        // Evento de clique para abrir o modal ao clicar em uma mesa
        document.querySelectorAll('.mesa').forEach(mesa => {
            mesa.addEventListener('click', () => {
                const mesaNumero = mesa.dataset.mesa;
                abrirModal(mesaNumero);
            });
        });

        // Função para simular o pagamento (adicione sua lógica de pagamento aqui)
        function pagar() {
            const checkboxes = document.querySelectorAll('.cliente-checkbox');
            const selectedClientes = Array.from(checkboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value);
        
            if (selectedClientes.length === 0) {
                alert('Selecione pelo menos um cliente para pagar.');
                return;
            }
        
            const mesaNumero = document.getElementById('mesa-numero').textContent;
        
            selectedClientes.forEach(clienteNome => {
                axios.put(`http://localhost:3000/comandas/${mesaNumero}`, { nomeCliente: clienteNome })
                    .then(response => {
                        console.log(response)
                        console.log(`Cliente ${clienteNome} pago com sucesso!`);
                    })
                    .catch(error => {
                        console.error(`Erro ao pagar para o cliente ${clienteNome}:`, error);
                    });
            });
        
            // Feche o modal após o pagamento
            fecharModal();
        }


// Função para fechar o modal
function fecharModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

// Função para fechar o modal ao clicar fora dele
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        fecharModal();
    }
}

function fecharModalDetalhes() {
    const modalDetalhes = document.getElementById('modal-detalhes');
    modalDetalhes.style.display = 'none';
}

// Evento de clique no botão de fechar da modal de detalhes
document.querySelector('#modal-detalhes button').addEventListener('click', fecharModalDetalhes);

// Evento de clique no botão de fechar
document.getElementById('close-button').addEventListener('click', fecharModal);