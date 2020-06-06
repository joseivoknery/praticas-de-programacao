const produto = require('./produto');
const cliente = require('./cliente');

module.exports = {
    cliente: cliente,
    valorCompra: Number,
    produtos: [produto],
    dataCompra: Date
}