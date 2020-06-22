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

// inicializa a massa de teste
router.get('/start', async (req, res) => {
   
    let response = 0;
    let mensagem = "";

    let produtos = await service.listarTodos();

    if (produtos.body === null || produtos.body.length === 0) {

        response = service.inicializa();
        mensagem = "Massa de Teste Inicializada com Sucesso!";
    }
    else {
        response = httpStatus.STATUS_OK;
        mensagem = "Massa de Teste Já Inicializada!";
    }

    res.status(response).send(mensagem);
})

module.exports = router