import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useHistory, useParams } from "react-router-dom";
import ProdutosService from '../../../servicos/produtos_service';


function FormProdutos() {
  const criaFormEmBranco = () => {
    return {
      nome: '',
      valor: 0.0,
      tipo: '',
      foto: ''
    };
  };

  const [form, setForm] = useState(criaFormEmBranco());
  const { idProduto } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (idProduto !== undefined) {
      ProdutosService.getProduto(idProduto).then((produto) => {
        setForm(produto)
      });
    }
  }, [idProduto]);

  const setValor = (evento, campo) => {
    setForm({ ...form, [campo]: evento.target.value });
  };

  const submeter = (evento) => {
    evento.preventDefault();
    if (idProduto === undefined) {
      ProdutosService.adicionarProduto(form, () => {
        history.push('/admin/produtos');
      });
    } else {
      ProdutosService.editarProduto(idProduto, form, () => {
        history.push('/admin/produtos');
      });
    }
  };

  return (
    <Form onSubmit={(e) => submeter(e)}>
      <Form.Group controlId="campoNome">
        <Form.Label>Nome</Form.Label>
        <Form.Control type="text" placeholder="Nome" value={form.nome} onChange={(e) => setValor(e, 'nome')} />
      </Form.Group>

      <Form.Group controlId="campoPreco">
        <Form.Label>Preço</Form.Label>
        <Form.Control type="number" min="0" step="0.01" value={form.valor} onChange={(e) => setValor(e, 'valor')} />
      </Form.Group>

      <Form.Group controlId="campoTipo">
        <Form.Label>Tipo</Form.Label>
        <Form.Control type="text" placeholder="Tipo" value={form.tipo} onChange={(e) => setValor(e, 'tipo')} />
      </Form.Group>

      <Form.Group controlId="campoFoto">
        <Form.Label>Foto</Form.Label>
        <Form.Control type="text" placeholder="Foto" value={form.foto} onChange={(e) => setValor(e, 'foto')} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Gravar
      </Button>
      &nbsp;
      <Button variant="secondary" type="button" onChange={(e) => setValor(e, 'foto')}>
        Limpar
      </Button>
    </Form>
  );
}

export default FormProdutos;