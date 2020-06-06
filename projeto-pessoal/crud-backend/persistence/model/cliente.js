const produto = require('./produto');
const user = require('./user');

module.exports = {
    nome: String,
    cpf: String,
    valorCompra: Number,
    produtos: [produto],
    foto: String,
    login: user
}