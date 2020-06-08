const express = require('express');
const router = express.Router();
const service = require('../../service/login-service');
const nivelAcesso = require('../../utils/nivel');


// realizar cadastro de um novo usuário/cliente no sistema
router.post('/signup', async (req, res) => {
  let response = await service.singUp(req.body, nivelAcesso.ADMIN);
  res.status(response.status).json(response);
})

// realizar login no sistema
router.post('/', async (req, res) => {
  let response = await service.login(req.body);
  res.status(response.status).json(response);
})

// realizar logout no sistema
router.get('/', async (req, res) => {
  let response = await service.logout();
  res.status(response.status).json(response);
});

// verifica se o token é valido
router.get('/valid', service.validarToken, (req, res, next) => {
  res.status(req.body.status);
});



module.exports = router;