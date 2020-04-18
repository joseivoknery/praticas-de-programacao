import React, {useState, useEffect} from 'react';
import { useParams, useHistory } from "react-router-dom";
import ProdutosService from '../../servicos/produtos_service';

import { LinkContainer } from 'react-router-bootstrap';
import Card from 'react-bootstrap/Card';

function VisualizarProduto() {
  const {idProduto} = useParams();
  const history = useHistory();
  const [produto, setProduto] = useState({});

  useEffect(() => {

    ProdutosService.getProduto(idProduto).then((produto) => {
      setProduto(produto);
    });

  }, [idProduto]);

  const formataDinheiro = (valor) => {
    if (valor !== undefined) {
      return 'R$ ' + parseFloat(valor).toFixed(2).replace('.',',');
    }
    
    return 'R$ 0,00';
  };
  
  const removerProduto = (evento, id) => {
    evento.preventDefault();
    ProdutosService.removerProduto(id, () => {
      history.push('/produtos');
    });
  };

  return (
    <Card className="detalheProduto">
      <Card.Img variant="top" src={produto.foto} alt="Foto do Produto" />
      <Card.Body>
        <Card.Title>{produto.nome}</Card.Title>
        <Card.Text>
          Preço: {formataDinheiro(produto.valor)}
        </Card.Text>
      </Card.Body>
      <Card.Body>
        <LinkContainer to={'/produtos/editar/' + produto._id}>
          <Card.Link className="btn btn-primary" href="#">Editar</Card.Link>
        </LinkContainer>
        <Card.Link onClick={(e) => removerProduto(e, produto._id)} className="btn btn-danger" href="#">Remover</Card.Link>
      </Card.Body>        
    </Card>
  );
}

export default VisualizarProduto;