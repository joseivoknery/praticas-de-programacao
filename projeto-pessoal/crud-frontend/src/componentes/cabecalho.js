import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import ProdutosService from '../servicos/produtos_service';

function Cabecalho() {

  ProdutosService.inicializa();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Navbar.Brand>Quick Food</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">

        <LinkContainer to="/">
            <Nav.Link>Home
            </Nav.Link>
          </LinkContainer>

          <LinkContainer to="/login">
            <Nav.Link>Login
            </Nav.Link>
          </LinkContainer>

          <LinkContainer to="/produtos">
            <Nav.Link>Produtos</Nav.Link>
          </LinkContainer>

          {/* <LinkContainer to="/cadastro">
            <Nav.Link>Cadastrar
            </Nav.Link>
          </LinkContainer> */}
          
          {/* <LinkContainer to="/produtos/novo">
            <Nav.Link>Novo Produto</Nav.Link>
          </LinkContainer> */}

          {/* <LinkContainer to="/clientes">
            <Nav.Link>Clientes</Nav.Link>
          </LinkContainer>

          <LinkContainer to="/clientes/novo">
            <Nav.Link>Novo Cliente</Nav.Link>
          </LinkContainer> */}

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Cabecalho;