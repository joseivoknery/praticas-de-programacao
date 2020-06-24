import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import ProdutosService from '../../servicos/produtos_service';

function HomePublic() {

  ProdutosService.start();

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

          <LinkContainer to="/public/login">
            <Nav.Link>Login
            </Nav.Link>
          </LinkContainer>

          <LinkContainer to="/public/produtos/">
            <Nav.Link>Menu</Nav.Link>
          </LinkContainer>

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default HomePublic;