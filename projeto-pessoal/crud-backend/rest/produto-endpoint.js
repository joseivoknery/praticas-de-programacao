const express = require('express');
const router = express.Router();
const service = require('../service/produto-service');
const utils = require('../utils/constantes-util');

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


// retorna todos os produtos
router.get('/inicializa', async (req, res) => {
    let response = await service.listarTodos();
    if (response.body === null || response.body.length === 0) {
        response.status = await service.inicializa();
        response.mensagem = "Massa de Teste Inicializada com Sucesso!";
    }
    else {
        response.status = utils.STATUS_OK;
        response.mensagem = "Massa de Teste Já Inicializada!";
    }
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