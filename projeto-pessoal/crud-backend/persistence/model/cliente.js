const produto = require('./produto');

module.exports = {
    nome: String,
    cpf: String,
    valorCompra: Number,
    produtos: [produto]
}