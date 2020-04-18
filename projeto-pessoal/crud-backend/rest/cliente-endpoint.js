const express = require('express');
const router = express.Router();
const service = require('../service/cliente-service');
const utils = require('../utils/constantes-util');


// cria um cliente
router.post('/', async (req, res) => {
    const response = await service.salvarCliente(req.body);
    res.status(response.status).json(response);
})

// atualiza um cliente pelo id
router.patch('/:id', async (req, res) => {
    const response = await service.editarCliente(req.params.id, req.body);
    res.status(response.status).json(response);
})

// retorna um cliente pelo id
router.get('/:id', async (req, res) => {

    let response = await service.getClienteById(req.params.id);

    res.status(response.status).json(response);

});

// remove um cliente
router.delete('/:id', async (req, res) => {

    let response = await service.removerCliente(req.params.id);

    res.status(response.status).json(response);

})

// retorna todos os clientes
router.get('/', async (req, res) => {

    let response = await service.listarTodos();

    res.status(response.status).json(response);
})


module.exports = router;