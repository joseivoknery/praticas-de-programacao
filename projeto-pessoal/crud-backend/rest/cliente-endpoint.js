const express = require('express');
const router = express.Router();
const service = require('../service/cliente-service');
const utils = require('../utils/constantes-util');

// cria um cliente
router.post('/', async (req, res) => {
    const novoCliente = await service.salvarCliente(req.body);
    res.status(utils.STATUS_CREATED).json(novoCliente);
})

// atualiza um cliente pelo id
router.patch('/:id', async (req, res) => {
    const clienteAtualizado = await service.editarCliente(req.params.id, req.body);
    res.status(utils.STATUS_OK).json(clienteAtualizado);
})

// retorna um cliente pelo id
router.get('/:id', async (req, res) => {

    try {

        let cliente = await service.getClienteById(req.params.id);

        if (cliente === null) {

            res.status(utils.STATUS_NOT_FOUND).json({ message: 'Nao foi possivel encontrar um produto com o id informado' })

        }

        res.json(cliente);

    } catch (err) {

        res.status(utils.STATUS_ERROR_SERVER).json({ message: err.message })

    }
});

// remove um cliente
router.delete('/:id', async (req, res) => {
    
    let response = await service.removerCliente(req.params.id);

    res.status(response);

})

// retorna todos os produtos
router.get('/', async (req, res) => {

    let response = await service.listarTodos();

    let clientes = [];

    response.map(doc => clientes.push(doc));

    res.status(utils.STATUS_OK).json(clientes);
})


module.exports = router;