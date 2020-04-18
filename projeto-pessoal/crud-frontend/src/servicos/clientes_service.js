var axios = require('axios');
const environments = require('../utils/environments');

// Implementação das funções CRUD
const getClientes = async () => {
  
  let response = await axios.get(environments.localhost + environments.clientes);

  return response.data;
  
};

const getCliente = async (idCliente) => {

  let response = await axios.get(environments.localhost + environments.clientes + idCliente);

  return response.data;
};

const removerCliente = async (id, callback) => {

  await axios.delete(environments.localhost + environments.clientes + id);

  callback();

};

const adicionarCliente = async (cliente, callback) => {

  console.log(cliente);

  await axios.post(environments.localhost + environments.clientes, cliente);

  callback();
};

const editarCliente = async (idCliente, cliente, callback) => {

  await axios.patch(environments.localhost + environments.clientes + idCliente, cliente);

  callback();
};


// Criando objeto singleton para exportar o serviço
const ClientesService = {
  getClientes,
  getCliente,
  adicionarCliente,
  removerCliente,
  editarCliente
};

// Exportando o serviço
export default ClientesService;