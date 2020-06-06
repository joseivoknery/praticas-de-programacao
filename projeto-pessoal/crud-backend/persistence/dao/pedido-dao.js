const mongoose = require('mongoose');
const Pedido = require('../model/pedido');

const PedidoSchema = new mongoose.Schema(Pedido);

module.exports = mongoose.model('Pedido', PedidoSchema);