const express = require('express');
const router = express.Router();
const service = require('../service/pedido-service');


// cria um Pedido
router.post('/', async (req, res) => {
    const response = await service.salvarPedido(req.body);
    res.status(response.status).json(response);
})

// atualiza um Pedido pelo id
router.patch('/:id', async (req, res) => {
    const response = await service.editarPedido(req.params.id, req.body);
    res.status(response.status).json(response);
})

// retorna um Pedido pelo id
router.get('/:id', async (req, res) => {

    let response = await service.getPedidoById(req.params.id);

    res.status(response.status).json(response);

});

// remove um Pedido
router.delete('/:id', async (req, res) => {

    let response = await service.removerPedido(req.params.id);

    res.status(response.status).json(response);

})

// retorna todos os Pedidos
router.get('/', async (req, res) => {

    let response = await service.listarTodos();

    res.status(response.status).json(response);
})


module.exports = router;