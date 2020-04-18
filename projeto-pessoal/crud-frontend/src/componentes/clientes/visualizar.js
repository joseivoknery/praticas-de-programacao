import React, {useState, useEffect} from 'react';
import { useParams, useHistory } from "react-router-dom";
import ClientesService from '../../servicos/clientes_service';

import { LinkContainer } from 'react-router-bootstrap';
import Card from 'react-bootstrap/Card';

function VisualizarClientes() {
  const {idCliente} = useParams();
  const history = useHistory();
  const [cliente, setCliente] = useState({});

  useEffect(() => {

    ClientesService.getClientes(idCliente).then((cliente) => {
      setCliente(cliente);
    });

  }, [idCliente]);

  const formataDinheiro = (valor) => {
    if (valor !== undefined) {
      return 'R$ ' + parseFloat(valor).toFixed(2).replace('.',',');
    }
    
    return 'R$ 0,00';
  };
  
  const removerCliente = (evento, id) => {
    evento.preventDefault();
    ClientesService.removerCliente(id, () => {
      history.push('/clientes');
    });
  };

  return (
    <Card className="detalheProduto">
      {/* <Card.Img variant="top" src={produto.foto} alt="Foto do Produto" /> */}
      <Card.Body>
        <Card.Title>{cliente.nome}</Card.Title>
        <Card.Text>
          Valor total da Compra: {formataDinheiro(cliente.valorCompra)}
        </Card.Text>
      </Card.Body>
      <Card.Body>
        <LinkContainer to={'/produtos/editar/' + cliente._id}>
          <Card.Link className="btn btn-primary" href="#">Editar</Card.Link>
        </LinkContainer>
        <Card.Link onClick={(e) => removerCliente(e, cliente._id)} className="btn btn-danger" href="#">Remover</Card.Link>
      </Card.Body>        
    </Card>
  );
}

export default VisualizarClientes;