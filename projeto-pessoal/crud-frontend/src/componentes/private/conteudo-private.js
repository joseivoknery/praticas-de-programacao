import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import style from './conteudo-private.module.css';

function ConteudoPrivado() {

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
      <p>
        Página de Acesso Privado!
      </p>
    </Jumbotron>
    
  );
}

export default ConteudoPrivado;