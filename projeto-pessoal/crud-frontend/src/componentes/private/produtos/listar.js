/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import ProdutosService from '../../servicos/produtos_service';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function ListarProdutos() {
  const [produtos, setProdutos] = useState([]);  

useEffect(() => {

  ProdutosService.getProdutos().then((produtos) => {
    setProdutos(produtos);
  });
  
}, []);

  const renderProduto = (produto) => {
    return (
      <Card className="produto">
        <Card.Img variant="top" src={produto.foto} />
        <Card.Body>
          <Card.Title>{produto.nome}</Card.Title>
          <LinkContainer to={"/produtos/" + produto._id}>
            <Button variant="primary" block>Visualizar</Button>
          </LinkContainer>
        </Card.Body>
      </Card>
    );
  };

  return (
    <div className="listaDeProdutos">
      { produtos.map(renderProduto) }
    </div>
  );
}

export default ListarProdutos;