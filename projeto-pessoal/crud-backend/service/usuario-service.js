const Usuario = require('../persistence/dao/usuario-dao');
const Security = require('../persistence/model/security');
const Payload = require('../persistence/model/payload');
const httpStatus = require('../utils/http-status');
const utils = require('../utils/constantes-util');
const response = require('../utils/response');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const login = async (body) => {

    let usuario = await Usuario.findOne({user: body.user});

    if (!usuario) {
      response.body = security(utils.STRING_EMPTY);
      response.mensagem = "'Não foi encontrado um usuário com o login informado!'";
      response.status = httpStatus.STATUS_Forbidden;
    } 
    else if (await bcrypt.compare(body.senha, usuario.senha)) {
      let payload = gerarPayload(usuario);
      let token = gerarToken(payload, process.env.SECRET);

      response.body = security(token);
      response.mensagem = "Acesso Permitido";
      response.status = httpStatus.STATUS_OK;
    } 
    else {
      response.body = security(utils.STRING_EMPTY);
      response.mensagem = "Senha inválida!";
      response.status = httpStatus.STATUS_Forbidden;
    }

    return response;
}

const gerarToken = (payload, secret) =>{
  return jwt.sign(payload, secret, {
    expiresIn: utils.TEMPO_TOKEN_EXPIRE // expira em 5 minutos (300 segundos)
  });
};

const gerarPayload = (load) =>{
  Payload.id =  load._id;
  Payload.login = load.user;
  return Payload;
};

const security = (token) =>{
  Security.auth = token === utils.STRING_EMPTY ? false : true;
  Security.token = token;
  return Security;
};

const methods = {
  login: login
};

module.exports = methods;