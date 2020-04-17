const Cliente = require('../persistence/dao/cliente-dao');
const utils = require('../utils/constantes-util');

const salvarCliente = async (cliente) => {
    return await new Cliente(cliente).save();
}

const editarCliente = async (id, cliente) => {

    let entity = await Cliente.findById(id);

    entity.nome = cliente.nome;
    entity.cpf = cliente.cpf;
    entity.valorCompra = cliente.valorCompra;
    entity.produtos = cliente.produtos;

    return await entity.save();
}

const getClienteById = async (id) => {

    let cliente = await Cliente.findById(id);

    return cliente;
}

const listarTodos = async () => {
    return await Cliente.find();
}

const removerCliente = async (id) => {

    let cliente = await Cliente.findById(id);

    cliente.remove();

    return utils.STATUS_OK;

};

const methods = {
    salvarCliente: salvarCliente,
    editarCliente: editarCliente,
    getClienteById: getClienteById,
    listarTodos: listarTodos,
    removerCliente: removerCliente
};

module.exports = methods;