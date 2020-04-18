/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import { LinkContainer } from 'react-router-bootstrap';
//import ProdutosService from '../../servicos/produtos_service';
import ClientesService from '../../servicos/clientes_service';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function ListarClientes() {
  const [clientes, setClientes] = useState([]);  

useEffect(() => {

  ClientesService.getClientes().then((clientes) => {
    setClientes(clientes);
  });
  
}, []);

  const renderClientes = (cliente) => {
    return (
      <Card className="cliente">
        {/* <Card.Img variant="top" src={cliente.foto} /> */}
        <Card.Body>
          <Card.Title>{cliente.nome}</Card.Title>
          <LinkContainer to={"/clientes/" + cliente._id}>
            <Button variant="primary" block>Visualizar</Button>
          </LinkContainer>
        </Card.Body>
      </Card>
    );
  };

  return (
    <div className="listaDeClientes">
      { clientes.map(renderClientes) }
    </div>
  );
}

export default ListarClientes;