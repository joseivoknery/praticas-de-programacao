const Pedido = require('../persistence/dao/pedido-dao');
const utils = require('../utils/constantes-util');
const response = require('../utils/response');

const salvarPedido = async (pedido) => {

    pedido.dataCompra = new Date();
    await new Pedido(pedido).save();

    response.mensagem = "O Pedido foi realizado com Sucesso!";

    response.status = utils.STATUS_CREATED;

    response.body = pedido;

    return response;
}

const editarPedido = async (id, pedido) => {

    let entity = await Pedido.findById(id);

    entity.cliente = pedido.cliente;
    entity.valorCompra = pedido.valorCompra;
    entity.produtos = pedido.produtos;
    entity.dataCompra = new Date();

    await entity.save();

    response.mensagem = "Pedido editado com Sucesso!";

    response.status = utils.STATUS_OK;

    response.body = pedido;

    return response;
}

const getPedidoById = async (id) => {

    try {

        let pedido = await Pedido.findById(id);

        if (pedido === null) {

            response.status = utils.STATUS_NOT_FOUND;

            response.mensagem = 'Nao foi possivel encontrar um Pedido com o id informado'

        } else {

            response.status = utils.STATUS_OK;

            response.mensagem = "Pedido " + pedido.nome + " Encontrado";

            response.body = pedido;

        }

    } catch (err) {

        response.status = utils.STATUS_ERROR_SERVER;

        response.mensagem = "Erro de Servidor - Contate o ADM!";

    }

    return response;
}

const listarTodos = async () => {

    try {

        let pedidos = await Pedido.find();

        if (pedidos.length > 0) {

            let body = []

            pedidos.map(doc => body.push(doc));

            response.mensagem = "Pedidos Encontrados";

            response.status = utils.STATUS_OK;

            response.body = body;

        }
        else {

            response.mensagem = "Nenhum Pedido Encontrado!";

            response.status = utils.STATUS_NOT_FOUND;

        }
    }
    catch (err) {

        response.status = utils.STATUS_ERROR_SERVER;

        response.mensagem = "Erro de Servidor - Contate o ADM!";

    }

    return response;
}

const removerPedido = async (id) => {

    let pedido = await Pedido.findById(id);

    await pedido.remove();

    response.mensagem = "O Pedido foi removido!";

    response.status = utils.STATUS_OK;

    return response;

};

const methods = {
    salvarPedido: salvarPedido,
    editarPedido: editarPedido,
    getPedidoById: getPedidoById,
    listarTodos: listarTodos,
    removerPedido: removerPedido
};

module.exports = methods;