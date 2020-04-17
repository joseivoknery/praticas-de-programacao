// Lê os dados do arquivo .env
require('dotenv').config()

// Importa os frameworks
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

// Conecta ao banco de dados
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Conectado ao Banco de Dados Mongodb com Sucesso 😄'))

// Cria o servidor web
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Configura o servidor web
app.use(cors())
app.use(express.json())

app.use('/', require('./rest/produto-endpoint'));

// Inicia o servidor web
http.listen(5000, () => console.log('Servidor NodeJs Inicializado com Sucesso 😄 '))