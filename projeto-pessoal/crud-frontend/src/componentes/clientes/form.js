import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import ProdutosService from '../../servicos/produtos_service';
import ClientesService from '../../servicos/clientes_service';

import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function FormClientes() {

  const criaFormEmBranco = () => {
    return {
      nome: '',
      cpf: '',
      valorCompra: 0,
      produtos: []
    };
  };

  const [form, setForm] = useState(criaFormEmBranco());
  const [produtosShow, setProdutosShow] = useState([]);
  const [produtosCompra, setProdutosCompra] = useState([]);
  const { idCliente } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (idCliente !== undefined) {
      ClientesService.getCliente(idCliente).then((cliente) => {
        setForm(cliente)
      });
    }
  }, [idCliente]);

  useEffect(() => {

    ProdutosService.getProdutos().then((produtos) => {
      setProdutosShow(produtos);
    });
    
  }, []);

  const setValor = (evento, campo) => {
    setForm({ ...form, [campo]: evento.target.value });
  };

  const setProduto = (produto) => {
    setProdutosCompra(produto);
  };

  const submeter = (evento) => {
    evento.preventDefault();

    form.produtos = produtosCompra;

    if (idCliente === undefined) {
      ClientesService.adicionarCliente(form, () => {
        history.push('/clientes');
      });
    } else {
      ClientesService.editarCliente(idCliente, form, () => {
        history.push('/clientes');
      });
    }
  };

  const renderProduto = (produto) => {
    return (
      <Card className="produto">
        <Card.Img variant="top" src={produto.foto} />
        <Card.Body>
          <Card.Title>{produto.nome} - R$:{produto.valor} </Card.Title>
          <Card.Link onClick={() => setProduto(produto)}>
            <Button variant="primary" block>Escolher Produto</Button>
          </Card.Link>
        </Card.Body>
      </Card>
    );
  };

  return (
    <Form onSubmit={(e) => submeter(e)}>
      <Form.Group controlId="campoNome">
        <Form.Label>Nome do Cliente</Form.Label>
        <Form.Control type="text" placeholder="Nome do Cliente" value={form.nome} onChange={(e) => setValor(e, 'nome')} />
      </Form.Group>

      <Form.Group controlId="campoCpf">
        <Form.Label>Cpf do Cliente</Form.Label>
        <Form.Control type="text" placeholder="Cpf do Cliente" value={form.cpf} onChange={(e) => setValor(e, 'cpf')} />
      </Form.Group>

      {/* <Form.Group controlId="campoPreco">
        <Form.Label>Valor da Compra</Form.Label>
        <Form.Control type="number" min="0" step="0.01" value={form.valorCompra} onChange={(e) => setValor(e, 'valorCompra')} />
      </Form.Group> */}

      <Form.Group controlId="campoListaProdutos">
        <Form.Label>Lista de Produtos</Form.Label>

        <div className="listaDeProdutos">
            { produtosShow.map(renderProduto) }
        </div>

        {/* <Form.Control type="list-group" placeholder="Lista de Produtos da Compra" value={form.produtos} onChange={(e) => setValor(e, 'produtos')} /> */}
      </Form.Group>

      <Button variant="primary" type="submit">
        Gravar
      </Button>
      &nbsp;
      <Button variant="secondary" type="button" onChange={(e) => setValor(e, 'produtos')}>
        Limpar
      </Button>
    </Form>
  );
}

export default FormClientes;