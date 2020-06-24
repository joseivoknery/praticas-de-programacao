import React from 'react';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
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
    <HomePublic />
    <Container>
      <Switch>
        <RotasPublicas />
      </Switch>
    </Container>
  </Router>
  );
}

export default App;
