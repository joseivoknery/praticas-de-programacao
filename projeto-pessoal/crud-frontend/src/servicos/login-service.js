var axios = require('axios');
const environments = require('../utils/environments');

// Implementação das funções Login
const login = async (form, callback) => {
  
  const response = await axios.post(environments.localhost + environments.public + environments.login , form);

  callback(response);
  
};

const autenticar = async (form, callback) => {

  let url =  (environments.localhost + environments.public + environments.login + environments.security);
 
  const response = await axios.get(url, {headers: {'x-access-token': form.x_access_token, 'authorization':  form.authorization}} );

  callback(response);
  
};

const signup = async (form, callback) => {
  
  const response = await axios.post(environments.localhost + environments.public + environments.login + environments.signup , form);

  callback(response);
  
};


const LoginService = {
  login,
  autenticar,
  signup
};

// Exportando o serviço
export default LoginService;