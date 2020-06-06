const Cliente = require('../persistence/dao/cliente-dao');
const utils = require('../utils/constantes-util');
const response = require('../utils/response');

const salvarCliente = async (cliente) => {

    await new Cliente(cliente).save();

    response.mensagem = "O Cliente foi Cadastrado com Sucesso!";

    response.status = utils.STATUS_CREATED;

    response.body = cliente;

    return response;
}

const editarCliente = async (id, cliente) => {

    let entity = await Cliente.findById(id);

    entity.nome = cliente.nome;
    entity.cpf = cliente.cpf;
    entity.valorCompra = cliente.valorCompra;
    entity.produtos = cliente.produtos;
    entity.login = cliente.login;

    await entity.save();

    response.mensagem = "Edição realizada com Sucesso!";

    response.status = utils.STATUS_OK;

    response.body = cliente;

    return response;
}

const getClienteById = async (id) => {

    try {

        let cliente = await Cliente.findById(id);

        if (cliente === null) {

            response.status = utils.STATUS_NOT_FOUND;

            response.mensagem = 'Nao foi possivel encontrar um cliente com o id informado'

        } else {

            response.status = utils.STATUS_OK;

            response.mensagem = "Cliente " + cliente.nome + " Encontrado";

            response.body = cliente;

        }

    } catch (err) {

        response.status = utils.STATUS_ERROR_SERVER;

        response.mensagem = "Erro de Servidor - Contate o ADM!";

    }

    return response;
}

const listarTodos = async () => {

    try {

        let clientes = await Cliente.find();

        if (clientes.length > 0) {

            let body = []

            clientes.map(doc => body.push(doc));

            response.mensagem = "Clientes Encontrados";

            response.status = utils.STATUS_OK;

            response.body = body;

        }
        else {

            response.mensagem = "Nenhum Cliente Encontrado!";

            response.status = utils.STATUS_NOT_FOUND;

        }
    }
    catch (err) {

        response.status = utils.STATUS_ERROR_SERVER;

        response.mensagem = "Erro de Servidor - Contate o ADM!";

    }

    return response;
}

const removerCliente = async (id) => {

    let cliente = await Cliente.findById(id);

    await cliente.remove();

    response.mensagem = "O Cliente foi removido!";

    response.status = utils.STATUS_OK;

    return response;

};

const methods = {
    salvarCliente: salvarCliente,
    editarCliente: editarCliente,
    getClienteById: getClienteById,
    listarTodos: listarTodos,
    removerCliente: removerCliente
};

module.exports = methods;