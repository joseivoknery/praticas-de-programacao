/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { LinkContainer } from 'react-router-bootstrap';
import ProdutosService from '../../../servicos/produtos_service';


function ListarProdutosPrivado() {
  const [produtos, setProdutos] = useState([]);  

useEffect(() => {

  ProdutosService.getProdutos().then((prods) => {
    setProdutos(prods);
  });
  
}, []);

  const renderProduto = (produto) => {
    return (
      <Card className="produto">
        <Card.Img variant="top" src={produto.foto} />
        <Card.Body>
          <Card.Title>{produto.nome}</Card.Title>
          <LinkContainer to={"/admin/produtos/" + produto._id}>
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

export default ListarProdutosPrivado;