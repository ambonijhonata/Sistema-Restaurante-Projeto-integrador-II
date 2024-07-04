import bebida from "../model/bebida.js";

class bebidaController {
  static listarbebida = async (req, res) => {
    try {
      const listar = await bebida.find();
      res.status(200).json(listar);
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error} - não foi possivel realizar as busca` });
    }
  };

  static listarbebidaPorId = async (req, res) => {
    const id = req.params.id;
    try {
      const resultado = await bebida.findById(id);
      res.status(200).send(resultado);
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error} - não foi possivel realizar busca` });
    }
  };

  static criarbebida = async (req, res) => {
    let bebidas = new bebida(req.body);
    try {
      await bebidas.save();
      res.status(201).send(bebidas.toJSON());
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error} - não foi possivel inserir o bebida` });
    }
  };

  static Atualizarbebida = async (req, res) => {
    const id = req.params.id;
    try {
      await bebida.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "bebida atualizado com sucesso" });
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error} - não foi possivel atulizar bebida` });
    }
  };

  static excluirbebida = async (req, res) => {
    const id = req.params.id;
    try {
      await bebida.findByIdAndDelete(id);
      res.status(200).send({ message: `bebida excluido com sucesso` });
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error} - não foi possivel excluir bebida` });
    }
  };
}

export default bebidaController;