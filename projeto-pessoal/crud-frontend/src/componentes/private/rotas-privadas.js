import React from 'react';
import Container from 'react-bootstrap/Container';
import { Route, Switch } from 'react-router-dom';
import FormProdutos from '../../componentes/private/produtos/form';
import ListarProdutosPrivados from '../../componentes/private/produtos/listar';
import VisualizarProdutosPrivados from '../../componentes/private/produtos/visualizar';
import ListarProdutosPublico from '../../componentes/public/produtos/listar';
import VisualizarProdutosPublico from '../../componentes/public/produtos/visualizar';
import NiveisAcesso from '../../utils/nivel';
import ConteudoPrivado from '../private/conteudo-private';
import SignUpPrivado from '../private/login/sign-up';

function RotasPrivadas(acesso) {
  const liberadorRotasPorNivelAcesso = (nivel) => {
    if (nivel === NiveisAcesso.ADMIN) {
      return (
        <>
          <Route path="/admin/cadastro" exact={true}>
            <SignUpPrivado />
          </Route>

          <Route path="/private/produtos/" exact={true}>
            <ListarProdutosPrivados />
          </Route>

          <Route path="/admin/produtos/novo">
            <FormProdutos />
          </Route>
          <Route path="/admin/produtos/editar/:idProduto">
            <FormProdutos />
          </Route>

          <Route path="/admin/produtos/:idProduto">
            <VisualizarProdutosPrivados />
          </Route>
        </>
      );
    } else if (nivel === NiveisAcesso.CLIENTE) {
      return (
        <>
          <Route path="/client/produtos/" exact={true}>
            <ListarProdutosPublico />
          </Route>

          <Route path="/client/produtos/:idProduto">
            <VisualizarProdutosPublico />
          </Route>
          {/*pedidos*/}
        </>
      );
    } else {
      return 'C';
    }
  };

  return (
    <Container>
      <Switch>
        <Route path="/access/" exact={true}>
          <ConteudoPrivado />
        </Route>

        {liberadorRotasPorNivelAcesso(acesso)}
      </Switch>
    </Container>
  );
}

export default RotasPrivadas;
