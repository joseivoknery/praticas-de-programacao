var axios = require('axios');
const environments = require('../utils/environments');

// Implementação das funções CRUD
const login = async (form, callback) => {
  
  await axios.post(environments.localhost + environments.public + environments.login , form);

  callback();
  
};


const LoginService = {
  login
};

// Exportando o serviço
export default LoginService;