const mongoose = require('mongoose');
const Usuario = require('../model/usuario');

const UsuarioSchema = new mongoose.Schema(Usuario);

module.exports = mongoose.model('Usuario', UsuarioSchema);