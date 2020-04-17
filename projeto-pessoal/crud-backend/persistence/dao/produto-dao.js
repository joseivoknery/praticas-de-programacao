const mongoose = require('mongoose');
const produto = require('../model/produto');

const produtoSchema = new mongoose.Schema(produto);

module.exports = mongoose.model('Produto', produtoSchema)