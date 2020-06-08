import React from 'react';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Cabecalho from './componentes/cabecalho';
import FormClientes from './componentes/clientes/form';
import ListarClientes from './componentes/clientes/listar';
import VisualizarClientes from './componentes/clientes/visualizar';
import SignUp from './componentes/login/sign-up';
import NaoEncontrada from './componentes/naoencontrada';
import FormProdutos from './componentes/produtos/form';
import ListarProdutos from './componentes/produtos/listar';
import VisualizarProduto from './componentes/produtos/visualizar';




function App() {
  return (
    <Router>
      <Cabecalho/>
      <Container>
        <Switch>

          <Route path="/" exact={true}><SignUp/></Route>

          <Route path="/produtos/" exact={true}>
            <ListarProdutos/>
          </Route>

          <Route path="/produtos/novo"><FormProdutos/></Route>
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
          </Route>

          <Route path="*"><NaoEncontrada/></Route>

        </Switch>
      </Container>
    </Router>
  );
}

export default App;