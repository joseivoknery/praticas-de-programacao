const express = require('express');
const router = express.Router();
const service = require('../service/login-service');

// realizar login no sistema
router.post('/', async (req, res) => {
  const response = await service.login(req.body);
  res.status(response.status).json(response);
})

router.get('/', async (req, res) => {
  const response = await service.logout(req.body);
  res.status(response.status).json(response);
});

module.exports = router;