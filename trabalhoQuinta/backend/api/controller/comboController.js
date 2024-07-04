import combo from "../model/combo.js";

class comboController {
  static listarcombo = async (req, res) => {
    try {
      const listar = await combo.find();
      res.status(200).json(listar);
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error} - não foi possivel realizar as busca` });
    }
  };

  static listarcomboPorId = async (req, res) => {
    const id = req.params.id;
    try {
      const resultado = await combo.findById(id);
      res.status(200).send(resultado);
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error} - não foi possivel realizar busca` });
    }
  };

  static criarcombo = async (req, res) => {
    let combos = new combo(req.body);
    try {
      await combos.save();
      res.status(201).send(combos.toJSON());
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error} - não foi possivel inserir o combo` });
    }
  };

  static Atualizarcombo = async (req, res) => {
    const id = req.params.id;
    try {
      await combo.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "combo atualizado com sucesso" });
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error} - não foi possivel atulizar combo` });
    }
  };

  static excluircombo = async (req, res) => {
    const id = req.params.id;
    try {
      await combo.findByIdAndDelete(id);
      res.status(200).send({ message: `combo excluido com sucesso` });
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error} - não foi possivel excluir combo` });
    }
  };
}

export default comboController;