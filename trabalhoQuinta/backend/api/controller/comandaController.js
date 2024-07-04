import comanda from "../model/comanda.js";
import produto from '../model/produto.js'
import bebida from '../model/bebida.js'
import combo from '../model/combo.js'


class comandaController {
  static listarcomanda = async (req, res) => {
    try {
      const listar = await comanda.find();
      res.status(200).json(listar);
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error} - não foi possivel realizar as busca` });
    }
  };

  static verificarSeExistePessoaNaComanda = async (req, res) => {
    try {
        const { mesa } = req.params;
        // Usar populate para carregar os detalhes dos produtos, bebidas e combos
        const comandaExistente = await comanda.findOne({ mesa })
            .populate('cliente.produtos')
            .populate('cliente.bebidas')
            .populate('cliente.combos');                

        if (!comandaExistente) {
            return res.status(404).json({ message: 'Comanda não encontrada.' });
        }

        //eprcorre os clientes e soma o total das comandas
        const resultados = comandaExistente.cliente.map(cliente => {
          const produtos = cliente.produtos.filter(produto => produto.valor !== null);
          const bebidas = cliente.bebidas.filter(bebida => bebida.valor !== null);
          const combos = cliente.combos.filter(combo => combo.valor !== null);
      
          const totalProdutos = produtos.reduce((acc, produto) => acc + produto.valor, 0);
          const totalBebidas = bebidas.reduce((acc, bebida) => acc + bebida.valor, 0);
          const totalCombos = combos.reduce((acc, combo) => acc + combo.valor, 0);
      
          const valorTotal = totalProdutos + totalBebidas + totalCombos;
      
          console.log(produtos);
          console.log(totalProdutos);
          console.log(totalBebidas);
          console.log(totalCombos);
      
          return {
              nome: cliente.nome,
              produtos: cliente.produtos,
              bebidas: cliente.bebidas,
              valorTotal: valorTotal
          };
      });      
      
      console.log('RESULTADOS')
      console.log(resultados)

        return res.status(200).json(resultados);
    } catch (error) {
        console.error('Erro ao obter valor total da comanda:', error);
        res.status(500).send({ message: 'Não foi possível obter o valor total da comanda.' });
    }
};

static listaComandaMesa = async (req, res) => {
  try {
      const { mesa } = req.params;

      // Encontrar a comanda correspondente à mesa fornecida
      const comandaExistente = await comanda.findOne({ mesa: parseInt(mesa, 10) });

      if (!comandaExistente) {
          
        return res.status(404).json({ message: 'Mesa não possui comanda vinculada.' });
      }

      // Preparar os dados dos pedidos separados por cliente
      const pedidosPorCliente = comandaExistente.clientes.map(cliente => {
          const totalProdutos = cliente.produtos.reduce((total, produto) => total + produto.preco, 0);
          const totalBebidas = cliente.bebidas.reduce((total, bebida) => total + bebida.preco, 0);
          const totalCombos = cliente.combos.reduce((total, combo) => total + combo.preco, 0);

          const total = totalProdutos + totalBebidas + totalCombos;
          return { nome: cliente.nome, total };
      });

      return res.status(200).json(pedidosPorCliente);
  } catch (error) {
      console.error('Erro ao retornar valores dos pedidos:', error);
      return res.status(500).send({ message: 'Erro ao retornar valores dos pedidos.' });
  }
};


  
static criarcomanda = async (req, res) => {
  console.log('Dados recebidos:', req.body);
  try {
      const { mesa, cliente } = req.body;
      console.log('BODY COMANDA CLIENTE: ')
      console.log(cliente)

      // Verificar se existe uma comanda para a mesma mesa
      const comandaExistente = await comanda.findOne({ mesa });

      if (comandaExistente) {
        console.log('Comanda existe');
    
        // Buscar os detalhes dos produtos, bebidas e combos no banco de dados
        const produtos = await produto.find({ _id: { $in: cliente.produtos } });
        const bebidas = await bebida.find({ _id: { $in: cliente.bebidas } });
        const combos = await combo.find({ _id: { $in: cliente.combos } });
    
        // Atualizar a comanda existente com os dados fornecidos
        let clienteExistente = comandaExistente.cliente.find(c => c.nome === cliente.nome);
        

        const listasIdProdutos = cliente.produtos
        const listasIdBebidas = cliente.bebidas

        if (clienteExistente) {
            // Atualizar os detalhes do cliente existente 
            console.log('LISTA ID PRODUTOS')
            console.log(listasIdProdutos)
            console.log('LISTA ID BEBIDAS')
            console.log(listasIdBebidas)                 

            if (cliente.produtos && cliente.produtos.length > 0) {
              //percorre o array qye veio e para cada id buscar no banco e dar um push
                for (const produtoId of listasIdProdutos) {
                  try {
                      const produtoData = await produto.findOne({ _id: produtoId });
                      console.log('DADO PRODUTO:', produtoData);
                      clienteExistente.produtos.push(produtoData);
                  } catch (error) {
                      console.error('Erro ao buscar produto:', error);
                  }
                }                 
            }
    
            if (cliente.bebidas && cliente.bebidas.length > 0) {
              //percorre o array de bebidas
              for (const bebidaId of listasIdBebidas) {
                try {
                    const bebidaData = await produto.findOne({ _id: bebidaId });
                    console.log('DADO BEBIDA:', bebidaData);
                    clienteExistente.bebidas.push(bebidaData);
                } catch (error) {
                    console.error('Erro ao buscar produto:', error);
                }
              }                
            }                
    
            if (cliente.comentarios && cliente.comentarios.length > 0) {
                clienteExistente.comentarios.push(...cliente.comentarios);
            }
        } else {
            // Adicionar novo cliente se não existir
            const novoClienteObj = {
                nome: cliente.nome,
                produtos: [],
                bebidas: [],                
                comentarios: cliente.comentario || []
            };

            //percorrer o array de bebidas e comida
            for (const produtoId of listasIdProdutos) {
              try {
                  const produtoData = await produto.findOne({ _id: produtoId });
                  console.log('DADO PRODUTO:', produtoData);
                  novoClienteObj.produtos.push(produtoData);
              } catch (error) {
                  console.error('Erro ao buscar produto:', error);
              }
            }

            for (const bebidaId of listasIdBebidas) {
              try {
                  const bebidaData = await produto.findOne({ _id: bebidaId });
                  console.log('DADO PRODUTO:', bebidaData);
                  novoClienteObj.bebidas.push(bebidaData);
              } catch (error) {
                  console.error('Erro ao buscar produto:', error);
              }
            }

            console.log('Novo cliente adicionado:', novoClienteObj);            
            comandaExistente.cliente.push(novoClienteObj);
        }
        console.log('Comanda existente:', comandaExistente);
    
        await comandaExistente.save();
        return res.status(200).json({ message: 'Comanda atualizada com sucesso.' });
    } else {
        console.log('Comanda não existe');
    
        var novoClienteObj = {
          mesa: mesa,
          cliente,        
          comentarios: cliente.comentarios || []
      };

      console.log('novoClientObj')
      console.log(novoClienteObj)

      const listasIdProdutos = novoClienteObj.cliente.produtos
      const listaIdBebidas = novoClienteObj.cliente.bebidas

      novoClienteObj.cliente.produtos = [];
      novoClienteObj.cliente.bebidas = []

      console.log('============vai imprimir os produtoId');
      for (const produtoId of listasIdProdutos) {
        try {
            const produtoData = await produto.findOne({ _id: produtoId });
            console.log('DADO PRODUTO:', produtoData);
            novoClienteObj.cliente.produtos.push(produtoData);
        } catch (error) {
            console.error('Erro ao buscar produto:', error);
        }
      }                  

      for(const bebidaId of listaIdBebidas) {
        try {
          const bebidaData = await produto.findOne({_id: bebidaId})
          console.log('DADOS BEBIDA')
          console.log(bebidaData)
          novoClienteObj.cliente.bebidas.push(bebidaData)
        } catch (error) {
          console.error('Erro ao buscar bebida:', error);
        }
      }

        console.log('novoClienteObj')
        console.log(novoClienteObj)

        const novaComanda = new comanda({
          mesa: novoClienteObj.mesa,
          cliente: [novoClienteObj.cliente]
        });

        console.log('nova comanda')
        console.log(novaComanda)
    
        await novaComanda.save();
        return res.status(201).json({ message: 'Comanda criada com sucesso.' });
    }
  } catch (error) {
      console.error('Erro ao criar comanda:', error);
      res.status(500).send({ message: 'Não foi possível inserir a comanda.' });
  }
};


static Atualizarcomanda = async (req, res) => {
  const mesa = req.params.mesa;
  const { nomeCliente } = req.body;

  try {
    const novaComanda = await comanda.findOne({ mesa: mesa });
    if (!novaComanda) {
      return res.status(404).send({ message: 'Comanda não encontrada' });
    }

    // Remove o cliente da lista de clientes
    novaComanda.cliente = novaComanda.cliente.filter(cliente => cliente.nome !== nomeCliente);

    // Se não houver mais clientes, exclui a comanda
    if (novaComanda.cliente.length === 0) {
      await comanda.findOneAndDelete({ mesa: mesa });
      return res.status(200).send({ message: 'Comanda excluída com sucesso' });
    }

    // Salva a comanda atualizada
    await novaComanda.save();
    res.status(200).send({ message: 'Cliente removido e comanda atualizada com sucesso' });
  } catch (error) {
    console.error(error); // Adicione esta linha para logar o erro no servidor
    res.status(500).send({ message: `${error} - Não foi possível atualizar a comanda` });
  }
};

static excluircomanda = async (req, res) => {
  const mesa = req.params.mesa;
  try {
    await comanda.findOneAndDelete({ mesa: mesa });
    res.status(200).send({ message: 'Comanda excluída com sucesso' });
  } catch (error) {
    console.error(error); // Adicione esta linha para logar o erro no servidor
    res.status(500).send({ message: `${error} - Não foi possível excluir a comanda` });
  }
};
}

export default comandaController;