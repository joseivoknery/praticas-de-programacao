import React from 'react';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignInSide from './componentes/login/sign-in-side';
import SignUp from './componentes/login/sign-up';
import NaoEncontrada from './componentes/naoencontrada';
//import FormProdutos from './componentes/produtos/form';
import ListarProdutos from './componentes/produtos/listar';
//import FormClientes from './componentes/clientes/form';
//import ListarClientes from './componentes/clientes/listar';
//import VisualizarClientes from './componentes/clientes/visualizar';
import ConteudoPublico from './componentes/public/conteudo-public';
//import VisualizarProduto from './componentes/produtos/visualizar';
//import Cabecalho from './componentes/cabecalho';
import HomePublic from './componentes/public/home-public';

function App() {
  return (
    <Router>
      <HomePublic/>
      <Container>
        <Switch>

        <Route path="/" exact={true}><ConteudoPublico/></Route>

          <Route path="/login" exact={true}><SignInSide/></Route>

          <Route path="/cadastro" exact={true}><SignUp/></Route>

          <Route path="/produtos/" exact={true}>
            <ListarProdutos/>
          </Route>

          {/* <Route path="/produtos/novo"><FormProdutos/></Route>
          <Route path="/produtos/editar/:idProduto">
            <FormProdutos/>
          </Route>

          <Route path="/produtos/:idProduto">
            <VisualizarProduto/>
          </Route>

          <Route path="/clientes/" exact={true}>
            <ListarClientes/>
          </Route>

          <Route path="/clientes/novo"><FormClientes/></Route>
          <Route path="/clientes/editar/:idCliente">
            <FormClientes/>
          </Route>

          <Route path="/clientes/:idCliente">
            <VisualizarClientes/>
          </Route> */}

          <Route path="*"><NaoEncontrada/></Route>

        </Switch>
      </Container>
    </Router>
  );
}

export default App;