const Usuario = require('../persistence/dao/usuario-dao');
const Security = require('../persistence/model/security');
const Payload = require('../persistence/model/payload');
const httpStatus = require('../utils/http-status');
const utils = require('../utils/constantes-util');
const response = require('../utils/response');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = require('../server');

const logout = async () => {
  response.body = security(utils.STRING_EMPTY);
  response.mensagem = 'Logout realizado com Sucesso!';
  response.status = httpStatus.STATUS_OK;

  return response;
};

const login = async (body) => {
  let usuario = await Usuario.findOne({ user: body.user });

  if (!usuario) {
    response.body = security(utils.STRING_EMPTY);
    response.mensagem =
      "'Não foi encontrado um usuário com o login informado!'";
    response.status = httpStatus.STATUS_Forbidden;
  } else if (await bcrypt.compare(body.senha, usuario.senha)) {
    let payload = gerarPayload(usuario);
    let token = gerarToken(payload, process.env.SECRET);
    //Adicionar o acesso aos Endpoints privados aqui
    response.body = security(token);
    response.mensagem = 'Acesso Permitido';
    response.status = httpStatus.STATUS_OK;
  } else {
    response.body = security(utils.STRING_EMPTY);
    response.mensagem = 'Senha inválida!';
    response.status = httpStatus.STATUS_Forbidden;
  }

  return response;
};

const gerarToken = (payload, secret) => {
  return jwt.sign(payload, secret, {
    expiresIn: utils.TEMPO_TOKEN_EXPIRE, // expira em 5 minutos (300 segundos)
  });
};

const validaToken = (token) => {
  return token === utils.STRING_EMPTY || token === null || token === undefined
    ? null
    : token;
};

const gerarPayload = (load) => {
  Payload.id = load._id;
  Payload.login = load.user;
  return Payload;
};

const security = (token) => {
  Security.auth = validaToken(token) === null ? false : true;
  Security.token = validaToken(token);
  return Security;
};

const methods = {
  login: login,
  logout: logout
};

module.exports = methods;
