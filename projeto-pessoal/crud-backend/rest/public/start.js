const express = require('express');
const router = express.Router();
const httpStatus = require('../../utils/http-status');
const service = require('../../service/produto-service');

// inicializa a massa de teste
router.get('/', async (req, res) => {
   
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