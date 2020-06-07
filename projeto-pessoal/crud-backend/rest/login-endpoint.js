const express = require('express');
const router = express.Router();
const service = require('../service/login-service');

// realizar login no sistema
router.post('/', async (req, res) => {
  const response = await service.login(req.body);
  res.status(response.status).json(response);
})

// realizar logout no sistema
router.get('/', async (req, res) => {
  const response = await service.logout();
  res.status(response.status).json(response);
});

// verifica se o token é valido
router.get('/valida-token', (req, res, next) => {
  const response = service.validarToken(req, res, next);
  res.status(response.status).json(response);
});

module.exports = router;