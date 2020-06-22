var axios = require('axios');
const environments = require('../utils/environments');

// Implementação das funções CRUD
const getProdutos = async () => {
  
  let response = await axios.get(environments.localhost + environments.public + environments.produtos);

  return response.data.body;
  
};

const getProduto = async (idProduto) => {

  let response = await axios.get(environments.localhost + environments.public + environments.produtos + idProduto);

  return response.data.body;
};

const removerProduto = async (id, callback) => {

  await axios.delete(environments.localhost + environments.public + environments.produtos + id);

  callback();

};

const start = () => {

  let response = '';

  axios.get(environments.localhost + environments.start).then((res) => {
    response = res;
  });

  return response;
};

const adicionarProduto = async (produto, callback) => {

  await axios.post(environments.localhost + environments.admin + environments.produtos, produto);

  callback();
};

const editarProduto = async (idProduto, produto, callback) => {

  await axios.patch(environments.localhost + environments.admin + environments.produtos + idProduto, produto);

  callback();
};


// Criando objeto singleton para exportar o serviço
const ProdutosService = {
  getProdutos,
  getProduto,
  adicionarProduto,
  removerProduto,
  editarProduto,
  start
};

// Exportando o serviço
export default ProdutosService;