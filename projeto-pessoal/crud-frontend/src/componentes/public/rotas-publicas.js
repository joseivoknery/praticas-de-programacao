import React from 'react';
import { Route } from 'react-router-dom';
import NaoEncontrada from '../naoencontrada';
import ConteudoPublico from './conteudo-public';
import SignInSide from './login/sign-in-side';
import SignUp from './login/sign-up';
import ListarProdutos from './produtos/listar';

function RotasPublicas() {
  return (
    <>
        <Route path="/" exact={true}>
          <ConteudoPublico />
        </Route>

        <Route path="/public/login" exact={true}>
          <SignInSide />
        </Route>

        <Route path="/public/cadastro" exact={true}>
          <SignUp />
        </Route>

        <Route path="/public/produtos/" exact={true}>
          <ListarProdutos />
        </Route>

        <Route path="*">
          <NaoEncontrada />
        </Route>

    </>
  );
}

export default RotasPublicas;
