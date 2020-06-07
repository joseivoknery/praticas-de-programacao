const express = require('express');
const router = express.Router();
const service = require('../service/produto-service');

// cria um produto
router.post('/', async (req, res) => {
    const response = await service.salvarProduto(req.body);
    res.status(response.status).json(response);
})

// atualiza um produto pelo id
router.patch('/:id', async (req, res) => {
    const response = await service.editarProduto(req.params.id, req.body);
    res.status(response.status).json(response);
})

// inicializa a massa de teste
router.get('/inicializa', async (req, res) => {
    const response = await service.inicializa();
    res.status(response.status).send(response);
})

// remove um produto
router.delete('/:id', async (req, res) => {
    let response = await service.removerProduto(req.params.id);
    res.status(response.status).json(response);
})

// retorna todos os produtos
router.get('/', async (req, res) => {
    let response = await service.listarTodos();
    res.status(response.status).json(response);
})

// retorna um produto pelo id
router.get('/:id', async (req, res) => {
    let response = await service.getProdutoById(req.params.id);
    res.status(response.status).json(response);
});

module.exports = router