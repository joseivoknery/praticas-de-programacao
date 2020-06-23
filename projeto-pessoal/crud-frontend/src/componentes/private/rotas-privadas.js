import React from 'react';
import Container from 'react-bootstrap/Container';
import { Route, Switch } from 'react-router-dom';
import FormProdutos from '../../componentes/produtos/form';
import ListarProdutos from '../../componentes/produtos/listar';
import VisualizarProdutos from '../../componentes/produtos/visualizar';
import NiveisAcesso from '../../utils/nivel';
import NaoEncontrada from '../naoencontrada';
import ConteudoPrivado from '../private/conteudo-private';
import SignUpPrivado from '../private/login/sign-up';


function RotasPrivadas() {


  const liberadorRotasPorNivelAcesso = (nivel) =>{

    if(nivel === NiveisAcesso.ADMIN){

      return "A";

    }
    else if(nivel === NiveisAcesso.CLIENTE){

      return "B";

    }
    else{
      return "C";
    }
    

  }

  return (
    <Container>

      <Switch>
        <Route path="/private/" exact={true}>
          <ConteudoPrivado />
        </Route>

        <Route path="/private/cadastro" exact={true}>
          <SignUpPrivado />
        </Route>

        <Route path="/produtos/" exact={true}>
          <ListarProdutos />
        </Route>

        <Route path="/produtos/novo"><FormProdutos/></Route>
          <Route path="/produtos/editar/:idProduto">
            <FormProdutos/>
          </Route>

          <Route path="/produtos/:idProduto">
            <VisualizarProdutos/>
          </Route>

        <Route path="*">
          <NaoEncontrada />
        </Route>

      </Switch>
      
    </Container>
  );


}

export default RotasPrivadas;