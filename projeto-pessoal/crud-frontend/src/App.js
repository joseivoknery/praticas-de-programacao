import React from 'react';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router, Switch } from "react-router-dom";
//import FormProdutos from './componentes/produtos/form';
//import FormClientes from './componentes/clientes/form';
//import ListarClientes from './componentes/clientes/listar';
//import VisualizarClientes from './componentes/clientes/visualizar';
//import VisualizarProduto from './componentes/produtos/visualizar';
import HomePublic from './componentes/public/home-public';
import RotasPublicas from './componentes/public/rotas-publicas';


function App() {
  return (
    <Router>
      <HomePublic/>
      <Container>
        <Switch>
          <RotasPublicas/>

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

         
        </Switch>
      </Container>
    </Router>
  );
}

export default App;