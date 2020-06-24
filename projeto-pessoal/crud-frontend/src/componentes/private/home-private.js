import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import RotasPrivadas from '../../componentes/private/rotas-privadas';
import NiveisAcesso from '../../utils/nivel';

function HomePrivate(acesso) {

  const defineAcesso = (nivel) => {
    if (nivel === NiveisAcesso.ADMIN) {
      return (
        <LinkContainer to="/admin/produtos">
          <Nav.Link>Produtos</Nav.Link>
        </LinkContainer>
      );
    } else if (nivel === NiveisAcesso.CLIENTE) {
      return (
        <LinkContainer to="/client/produtos">
          <Nav.Link>Produtos</Nav.Link>
        </LinkContainer>
      );
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Navbar.Brand>Quick Food</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/access">
            <Nav.Link>Admin</Nav.Link>
          </LinkContainer>
          { RotasPrivadas(acesso) }
          {defineAcesso(acesso)}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default HomePrivate;
