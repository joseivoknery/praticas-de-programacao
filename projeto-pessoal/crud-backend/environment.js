const DATABASE_URL = "mongodb://localhost/crud-backend";
const SERVER_PORT = 5000;
const SECRET = "jiknVSC";
const SALT_ROUNDS = 12;

const environment = {
  DATABASE_URL: DATABASE_URL,
  SERVER_PORT: SERVER_PORT,
  SECRET: SECRET,
  SALT_ROUNDS: SALT_ROUNDS
}

module.exports = environment;

/* PAGSEGURO_TOKEN=8B2E0E69AB45454AB8D48388C8984BD5
EMAIL_VENDEDOR=brunogamacatao@gmail.com
HOST_PAGSEGURO=ws.sandbox.pagseguro.uol.com.br */