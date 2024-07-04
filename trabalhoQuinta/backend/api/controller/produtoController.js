import  produto from "../model/produto.js";

class produtoController {
  static listarproduto = async (req, res) => {
    try {
      const listar = await produto.find();
      res.status(200).json(listar);
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error} - não foi possivel realizar as busca` });
    }
  };

  static listarprodutoPorId = async (req, res) => {
    const id = req.params.id;
    try {
      const resultado = await produto.findById(id);
      res.status(200).send(resultado);
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error} - não foi possivel realizar busca` });
    }
  };

  static criarproduto = async (req, res) => {
    let produtos = new produto(req.body);
    try {
      await produtos.save();
      res.status(201).send(produtos.toJSON());
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error} - não foi possivel inserir o produto` });
    }
  };

  static Atualizarproduto = async (req, res) => {
    const id = req.params.id;
    try {
      await produto.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "produto atualizado com sucesso" });
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error} - não foi possivel atulizar produto` });
    }
  };

  static excluirproduto = async (req, res) => {
    const id = req.params.id;
    try {
      await produto.findByIdAndDelete(id);
      res.status(200).send({ message: `produto excluido com sucesso` });
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error} - não foi possivel excluir produto` });
    }
  };
}

export default produtoController;