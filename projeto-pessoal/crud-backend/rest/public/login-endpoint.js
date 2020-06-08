const express = require('express');
const router = express.Router();
const service = require('../../service/login-service');
const nivelAcesso = require('../../utils/nivel');

// realizar cadastro de um novo usuário/cliente no sistema
router.post('/signup', async (req, res) => {

  let usuario = await service.findUser({nivel: nivelAcesso.ADMIN});

  if (usuario === null || usuario === undefined) {
    let response = await service.singUp(req.body, nivelAcesso.ADMIN);
    res.status(response.status).json(response);
  }
  else{
    let response = await service.singUp(req.body, nivelAcesso.CLIENTE);
    res.status(response.status).json(response);
  }

});

// realizar login no sistema
router.post('/', async (req, res) => {
  let response = await service.login(req.body);
  res.status(response.status).json(response);
});

// realizar logout no sistema
router.get('/', async (req, res) => {
  let response = await service.logout();
  res.status(response.status).json(response);
});

// verifica se o token é valido
router.get('/security', async (req, res) => {

  let response = await service.validarToken(req);

  if (parseInt(response.body) === nivelAcesso.ADMIN) {  
    const app = require('../../server');
    app.use('/admin/login', require('../private/login-endpoint'));
    app.use('/admin/produtos', require('../private/produto-endpoint'));
  } else if (parseInt(response.body) === nivelAcesso.CLIENTE) {
    app.use('/client/pedidos', require('../rest/private/pedido-endpoint'));
  }
  res.status(response.status).json(response);
});

module.exports = router;
