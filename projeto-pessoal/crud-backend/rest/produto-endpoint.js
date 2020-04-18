const express = require('express');
const router = express.Router();
const service = require('../service/produto-service');
const utils = require('../utils/constantes-util');

// cria um produto
router.post('/', async (req, res) => {
    const novoProduto = await service.salvarProduto(req.body);
    res.status(utils.STATUS_CREATED).json(novoProduto);
})

// atualiza um produto pelo id
router.patch('/:id', async (req, res) => {
    const produtoAtualizado = await service.editarProduto(req.params.id, req.body);
    res.status(utils.STATUS_OK).json(produtoAtualizado);
})


// retorna todos os produtos
router.get('/inicializa', async (req, res) => {

    let response = 0;
    let mensagem = utils.STRING_EMPTY;

    let produtos = await service.listarTodos();

    if (produtos === null || produtos.length === 0) {

        response = await service.inicializa();
        mensagem = "Massa de Teste Inicializada com Sucesso!";
    }
    else {
        response = utils.STATUS_OK;
        mensagem = "Massa de Teste Já Inicializada!";
    }

    res.status(response).send(mensagem);
})

// remove um produto
router.delete('/:id', async (req, res) => {
    
    let response = await service.removerProduto(req.params.id);

    res.status(response).send("O Produto:");

})

// retorna todos os produtos
router.get('/', async (req, res) => {

    let response = await service.listarTodos();

    let produtos = [];

    response.map(doc => produtos.push(doc));

    res.status(utils.STATUS_OK).json(produtos);
})

// retorna um produto pelo id
router.get('/:id', async (req, res) => {

    try {

        let produto = await service.getProdutoById(req.params.id);

        if (produto === null) {

            res.status(utils.STATUS_NOT_FOUND).json({ message: 'Nao foi possivel encontrar um produto com o id informado' })

        }

        res.json(produto);

    } catch (err) {

        res.status(utils.STATUS_ERROR_SERVER).json({ message: err.message })

    }

})

module.exports = router