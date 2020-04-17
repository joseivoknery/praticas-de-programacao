const mongoose = require('mongoose');
const Cliente = require('../model/cliente');

const ClienteSchema = new mongoose.Schema(Cliente);

module.exports = mongoose.model('Cliente', ClienteSchema);