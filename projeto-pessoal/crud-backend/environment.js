const DATABASE_URL = "mongodb://localhost/crud-backend";
const SERVER_PORT = 5000;
const SECRET = "koerichNery";
const SALT_ROUNDS = 20;

const environment = {
  DATABASE_URL: DATABASE_URL,
  SERVER_PORT: SERVER_PORT,
  SECRET: SECRET,
  SALT_ROUNDS: SALT_ROUNDS
}

module.exports = environment;