const express = require('express');
const router = express.Router();
const service = require('../service/produto-service');

const STATUS_CREATED = 201;

const STATUS_OK = 200;

// cria um produto
router.post('/produtos', async (req, res) => {
    const novoProduto = await service.salvarProduto(req.body);
    res.status(STATUS_CREATED).json(novoProduto);
})

// atualiza um produto pelo id
router.patch('/produtos/:id', async (req, res) => {
    const produtoAtualizado = await service.editarProduto(req.params.id, req.body);
    res.status(STATUS_OK).json(produtoAtualizado);
})


// retorna todos os produtos
router.get('/inicializa', async (req, res) => {

    let response = 0;
    let mensagem = "";

    let produtos = await service.listarTodos();

    if (produtos === null || produtos.length === 0) {

        response = await service.inicializa();
        mensagem = "Massa de Teste Inicializada com Sucesso!";
    }
    else {
        response = STATUS_OK;
        mensagem = "Massa de Teste Já Inicializada!";
    }

    res.status(response).send(mensagem);
})

// remove um produto
router.delete('/produtos/:id', async (req, res) => {
    
    let response = await service.removerProduto(req.params.id);

    res.status(response).send("teste de exclusao");

})

// retorna todos os produtos
router.get('/produtos', async (req, res) => {

    let response = await service.listarTodos();

    let produtos = [];

    response.map(doc => produtos.push(doc));

    res.status(200).json(produtos);
})

// retorna um produto pelo id
router.get('/produtos/:id', async (req, res) => {

    try {

        let produto = await service.getProdutoById(req.params.id);

        if (produto === null) {

            res.status(404).json({ message: 'Nao foi possivel encontrar um produto com o id informado' })

        }

        res.json(produto);

    } catch (err) {

        res.status(500).json({ message: err.message })

    }

})

module.exports = router