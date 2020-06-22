const express = require('express');
const router = express.Router();
const service = require('../../service/login-service');
const nivelAcesso = require('../../utils/nivel');

// realizar cadastro de um novo usuário admin no sistema
router.post('/signup', async (req, res) => {
  let response = await service.singUp(req.body, nivelAcesso.ADMIN);
  res.status(response.status).json(response);
})

// realizar cadastro de um novo usuário admin no sistema
router.delete('/', async (req, res) => {
 /*  let response = await service.singUp(req.body, nivelAcesso.ADMIN);
  res.status(response.status).json(response); */
})

module.exports = router;