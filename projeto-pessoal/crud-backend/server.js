// Lê os dados do arquivo .env
require('dotenv').config()

// Importa os frameworks
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Conecta ao banco de dados
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('conectado ao banco de dados'))

// Cria o servidor web
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Configura o servidor web
app.use(cors()); // permite requisições CORS de qualquer host
app.use(cookieParser()); // processa os cookies do cabeçalho e popula req.cookies com um objeto onde os nomes dos cookies são as chaves
app.use(express.json()); // se o corpo da requisição é json, popula um objeto req.body com seu valor
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.use('/produtos', require('./rest/produto-endpoint'));
app.use('/clientes', require('./rest/cliente-endpoint'));
app.use('/pedidos', require('./rest/pedido-endpoint'));
app.use('/login', require('./rest/login-endpoint'));

// Inicia o servidor web
http.listen(process.env.SERVER_PORT, () => console.log('Servidor NodeJs Inicializado com Sucesso 😄 '));

module.exports = app;