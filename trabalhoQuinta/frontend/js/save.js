chamaDados()
enviarDados()

function enviarDados(){
    const formulario = document.getElementById("form")
    formulario.addEventListener('submit', (e) =>{  
        e.preventDefault()
        const Url = 'http://localhost:3000'

        const formData = new FormData(formulario)

        const pedido = {};
        formData.forEach((value, key) => {
            pedido[key] = value;
        });

        console.log(pedido)

        
        axios.post(`${Url}/comandas`, pedido)
            .then((response) => {
                console.log(response.data);
                alert('Pedido enviado com sucesso!');
            })
            .catch((error) => {
                console.error('Erro ao enviar pedido:', error);
                alert('Erro ao enviar pedido. Por favor, tente novamente mais tarde.');
            });
            
    });
}


function chamaDados(){
    document.addEventListener('DOMContentLoaded', () => {
        const Url = 'http://localhost:3000'

        const comida = document.getElementById('produtos');
        const bebida = document.getElementById('bebidas');
        const combo = document.getElementById('combos');



        axios.get(Url+'/produtos')
            .then((response) => {
                comida.innerHTML = '<option value="">Selecione...</option>'
                const dados = response.data
                
                if(dados.length>0){
                    dados.forEach(item => {
                        const option = document.createElement('option')
                        option.value = item._id;
                        option.textContent = `${item.produto} - Valor: R$${item.valor.toFixed(2)}`
                        comida.appendChild(option)
                    })
                }
                else{
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
            }) 
            //campo de bebidas
        axios.get(Url+'/bebidas')
            .then((response) => {
                bebida.innerHTML = '<option value="">Selecione...</option>'
                const dados = response.data
            
                if(dados.length>0){
                    dados.forEach(item => {
                        const option = document.createElement('option')
                        option.value = item._id;
                        option.textContent = `${item.bebida} - Valor: R$${item.valor.toFixed(2)}`
                        bebida.appendChild(option)
                    })
                }
                else{
                    const option = document.createElement('option');
                    option.value = '';
                    option.textContent = 'sem produtos cadastrados';
                    bebida.appendChild(option);
                }
            })
            .catch((error) => {
                console.error('erro na recuperação de dados:', error);
                // Adicionar uma opção de erro
                bebida.innerHTML = '<option value="">Error</option>';
            }) 

            //campo de combos
        axios.get(Url+'/combos')
            .then((response) => {
                combo.innerHTML = '<option value="">Selecione...</option>'
                const dados = response.data
                
                if(dados.length>0){
                    dados.forEach(item => {
                        const option = document.createElement('option')
                        option.value = item._id;
                        option.textContent = `${item.combo} - Valor: R$${item.valor.toFixed(2)}`
                        combo.appendChild(option)
                    })
                }
                else{
                    const option = document.createElement('option');
                    option.value = '';
                    option.textContent = 'sem produtos cadastrados';
                    combo.appendChild(option);
                }
            })
            .catch((error) => {
                console.error('erro na recuperação de dados:', error);
                // Adicionar uma opção de erro
                combo.innerHTML = '<option value="">Error</option>';
            }) 
    })
}