const Usuario = require('../persistence/dao/usuario-dao');
const Security = require('../persistence/model/security');
const Payload = require('../persistence/model/payload');
const http_status = require('../utils/http-status');
const utils = require('../utils/constantes-util');
const response = require('../utils/response');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const BCRYPT_SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
const nivelAcesso = require('../utils/nivel');

const singUp = async (body, acesso) => {
  body.senha = await bcrypt.hash(body.senha, BCRYPT_SALT_ROUNDS);
  body.nivel = acesso;
  await new Usuario(body).save();
  response.mensagem = 'O Usuario foi Cadastrado com Sucesso!';
  response.status = http_status.STATUS_CREATED;
  return response;
};

const logout = async () => {
  response.body = security(utils.STRING_EMPTY, nivelAcesso.NO_ACESS);
  response.mensagem = 'Logout realizado com Sucesso!';
  response.status = http_status.STATUS_OK;
  return response;
};

const findUser = async (body) => {
  let usuario = await Usuario.findOne({ nivel: body.nivel });
  return usuario;
}

const login = async (body) => {

  let usuario = await Usuario.findOne({ login: body.login, nivel: body.nivel });

  if (!usuario) {
    response.body = security(utils.STRING_EMPTY, nivelAcesso.NO_ACESS);
    response.mensagem =
      "'Não foi encontrado um usuário com o login informado!'";
    response.status = http_status.STATUS_Forbidden;
  } else if (await bcrypt.compare(body.senha, usuario.senha)) {
    let payload = gerarPayload(usuario);
    let token = gerarToken(payload, process.env.SECRET);
    response.body = security(token, usuario.nivel);
    response.mensagem = 'Acesso Permitido';
    response.status = http_status.STATUS_OK;
  } else {
    response.body = security(utils.STRING_EMPTY, nivelAcesso.NO_ACESS);
    response.mensagem = 'Senha inválida!';
    response.status = http_status.STATUS_Forbidden;
  }

  return response;
};

const gerarToken = (payload, secret) => {
  return jwt.sign(payload, secret, {
    expiresIn: utils.TIME_TOKEN_EXPIRE, // expira em 5 minutos (300 segundos)
  });
};

const hasToken = (token) => {
  return token === utils.STRING_EMPTY || token === null || token === undefined
    ? false
    : true;
};

const validarToken = async (req) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];

  if (!hasToken(token)) {
    response.body = security(token, nivelAcesso.NO_ACESS);
    response.status = http_status.STATUS_Unauthorized;
    response.mensagem = 'O token não existe!';
  } else {

    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }

   jwt.verify(token, process.env.SECRET, async (err, decoded) => {
      if (err) {
        response.body = security(null, nivelAcesso.NO_ACESS);
        response.status = http_status.STATUS_ERROR_SERVER;
        response.mensagem = 'Não foi possível autenticar o token.';
      }
      else{
        response.status = http_status.STATUS_OK;
        response.mensagem = 'Token Válido -> ' + decoded.id;
        let usuario = await Usuario.findById(decoded.id);
        response.body = usuario.nivel;
      }
    });
  }

  return response;
}

const gerarPayload = (load) => {
  Payload.id = load._id;
  Payload.login = load.user;
  return Payload;
};

const security = (token, nivel) => {
  let has = hasToken(token);
  Security.auth = has ? utils.TOKEN_IS_VALID : utils.TOKEN_IS_NOT_VALID;
  Security.token = has ? token : utils.TOKEN_NOT_EXIST;
  Security.msg = has ? http_status.STATUS_OK : http_status.STATUS_Unauthorized;
  Security.nivel = has ? nivel : nivelAcesso.NO_ACESS;
  return Security;
};

const methods = {
  login: login,
  logout: logout,
  validarToken: validarToken,
  singUp: singUp,
  findUser:findUser
};

module.exports = methods;
