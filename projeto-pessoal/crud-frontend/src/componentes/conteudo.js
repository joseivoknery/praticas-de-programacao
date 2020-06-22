import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import ProdutosService from '../servicos/produtos_service';
import style from './conteudo.module.css';

function Conteudo() {

  ProdutosService.inicializa();
  
  return (
    <Jumbotron>
      <h1 className={style.titulo}>Integração entre Backend e Frontend</h1>
      <p>
        Projeto da Integração entre Backend e Frontend - 4 pontos
      </p>
      <p>
        Práticas de Programação - Bruno Catão
      </p>
      <p>
        Aluno: José Ivo Koerich Nery 182.308.00-07
      </p>
    </Jumbotron>
    
  );
}

export default Conteudo;