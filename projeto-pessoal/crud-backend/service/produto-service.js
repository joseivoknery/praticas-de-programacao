const Produto = require('../persistence/dao/produto-dao');
const http_status = require('../utils/http-status');
const response = require('../utils/response');

// inicializa o banco com dados de teste
function inicializa() {
       
    new Produto({ 'nome': 'Coca-Cola Lata', 'valor': 3.0, 'tipo': 'Bebida', 'foto': 'https://d3efjz1jvymzgz.cloudfront.net/Custom/Content/Products/10/11/1011792_refrigerante-coca-cola-lata-350ml-fardo-c-12-unidades_m1_637051111791632885.png' }).save();
    new Produto({ 'nome': 'Suco de Laranja - Jarra', 'valor': 8.0, 'tipo': 'Bebida', 'foto': 'https://image.freepik.com/fotos-gratis/jarra-de-suco-de-laranja-e-frutas-laranja-isoladas_80510-975.jpg' }).save();
    new Produto({ 'nome': 'Batata Frita', 'valor': 11.0, 'tipo': 'Petisco', 'foto': 'https://cdn.panelinha.com.br/receita/953607600000-Batata-frita-tradicional.jpg' }).save();
    new Produto({ 'nome': 'Pão de Alho', 'valor': 10.0, 'tipo': 'Petisco', 'foto': 'https://www.receitasnestle.com.br/images/default-source/recipes/pao_de_alho.jpg' }).save();
    new Produto({ 'nome': 'Filé a Parmegiana', 'valor': 18.0, 'tipo': 'Refeição', 'foto': 'https://leianoticias.com.br/wp-content/uploads/Fil%C3%A9-capa.jpg' }).save();
    new Produto({ 'nome': 'Feijoada', 'valor': 35.0, 'tipo': 'Refeição', 'foto': 'https://img.cybercook.com.br/receitas/776/feijoada-623x350.jpeg' }).save();
    
    return  http_status.STATUS_CREATED;
}

const salvarProduto = async (produto) => {
    
    await new Produto(produto).save();

    response.mensagem = "O Produto foi Cadastrado com Sucesso!";

    response.status = http_status.STATUS_CREATED;

    response.body = produto;

    return response;
}

const editarProduto = async (id, produto) => {

    let entity = await Produto.findById(id);

    entity.nome = produto.nome;
    entity.valor = produto.valor;
    entity.tipo = produto.tipo;
    entity.foto = produto.foto;

    await entity.save();

    response.mensagem = "Edição realizada com Sucesso!";

    response.status = http_status.STATUS_OK;

    response.body = produto;

    return response;
}

const getProdutoById = async (id) => {

    try {

        let produto = await Produto.findById(id);

        if (produto === null) {

            response.status = http_status.STATUS_NOT_FOUND;

            response.mensagem = 'Nao foi possivel encontrar um produto com o id informado'

        } else {

            response.status = http_status.STATUS_OK;

            response.mensagem = "Produto " + produto.nome + " Encontrado";

            response.body = produto;

        }

    } catch (err) {

        response.status = http_status.STATUS_ERROR_SERVER;

        response.mensagem = "Erro de Servidor - Contate o ADM!";

    }

    return response;
}

const listarTodos = async () => {

    try {

        let produtos = await Produto.find();

        if (produtos.length > 0) {

            let body = []

            produtos.map(doc => body.push(doc));

            response.mensagem = "Produtos Encontrados";

            response.status = http_status.STATUS_OK;

            response.body = body;

        }
        else {

            response.mensagem = "Nenhum Produto Encontrado!";

            response.status = http_status.STATUS_NOT_FOUND;

            response.body = null;

        }
    }
    catch (err) {

        response.status = http_status.STATUS_ERROR_SERVER;

        response.mensagem = "Erro de Servidor - Contate o ADM!";

        response.body = "ERRO AQUI";

    }

    return response;


}

const removerProduto = async (id) => {

    let produto = await Produto.findById(id);

    produto.remove();

    response.mensagem = "O Produto foi removido!";

    response.status = http_status.STATUS_OK;

    return response;

};

//Lista de Métodos que serão Expostos
const methods = {
    inicializa: inicializa,
    listarTodos: listarTodos,
    getProdutoById: getProdutoById,
    removerProduto: removerProduto,
    salvarProduto: salvarProduto,
    editarProduto: editarProduto
}

module.exports = methods