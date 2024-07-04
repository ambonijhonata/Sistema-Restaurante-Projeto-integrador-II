import usuario from "../model/usuario.js";

class usuarioController {
  static listarusuario = async (req, res) => {
    try {
      const listar = await usuario.find();
      res.status(200).json(listar);
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error} - não foi possivel realizar as busca` });
    }
  };

  static fazerLogin = async (req, res) => {
    const { login, pass } = req.body;

    try {
        console.log(login)
        const user = await usuario.findOne({ login, pass });
        if (user) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
  };

  static listarusuarioPorId = async (req, res) => {
    const id = req.params.id;
    try {
      const resultado = await usuario.findById(id);
      res.status(200).send(resultado);
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error} - não foi possivel realizar busca` });
    }
  };

  static criarusuario = async (req, res) => {
    let usuarios = new usuario(req.body);
    try {
      await usuarios.save();
      res.status(201).send(usuarios.toJSON());
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error} - não foi possivel inserir o usuario` });
    }
  };

  static Atualizarusuario = async (req, res) => {
    const id = req.params.id;
    try {
      await usuario.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "usuario atualizado com sucesso" });
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error} - não foi possivel atulizar usuario` });
    }
  };

  static excluirusuario = async (req, res) => {
    const id = req.params.id;
    try {
      await usuario.findByIdAndDelete(id);
      res.status(200).send({ message: `usuario excluido com sucesso` });
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error} - não foi possivel excluir usuario` });
    }
  };
}

export default usuarioController;