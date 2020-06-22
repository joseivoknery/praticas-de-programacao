const express = require('express');
const router = express.Router();
const service = require('../../service/produto-service');

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