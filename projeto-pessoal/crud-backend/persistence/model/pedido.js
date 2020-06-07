const produto = require('./produto');
const cliente = require('./usuario');

module.exports = {
    cliente: cliente,
    valorCompra: Number,
    produtos: [produto],
    dataCompra: Date
}