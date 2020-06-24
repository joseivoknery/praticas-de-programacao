import React from 'react';
import Container from 'react-bootstrap/Container';
import { Route, Switch } from 'react-router-dom';
import NaoEncontrada from '../naoencontrada';
import ConteudoPublico from './conteudo-public';
import SignInSide from './login/sign-in-side';
import SignUp from './login/sign-up';
import ListarProdutos from './produtos/listar';

function RotasPublicas() {
  return (
    <Container>

      <Switch>
        <Route path="/" exact={true}>
          <ConteudoPublico />
        </Route>

        <Route path="/login" exact={true}>
          <SignInSide />
        </Route>

        <Route path="/cadastro" exact={true}>
          <SignUp />
        </Route>

        <Route path="/produtos/" exact={true}>
          <ListarProdutos />
        </Route>

        <Route path="*">
          <NaoEncontrada />
        </Route>

      </Switch>
      
    </Container>
  );
}

export default RotasPublicas;
