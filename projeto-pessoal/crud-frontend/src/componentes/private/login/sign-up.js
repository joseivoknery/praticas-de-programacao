import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import LoginService from '../../../servicos/login-service';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Quick Food
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  image: {
    backgroundImage: 'url(https://s3-sa-east-1.amazonaws.com/images-clients.agendaopen.com/47a1c75acf7c1ed10fe99809997bf50b_1.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));

export default function SignUpPrivado() {
  const classes = useStyles();
  const history = useHistory();

  const CADASTRAR = () => {
    return {
        nome: "",
        cpf: "",
        login: "",
        senha: "",
        nivel: "",
        endereco: "",
        telefone: ""
    };
  };

  const AUTH_TOKEN = () => {
    return {
      x_access_token: "",
      authorization: ""
    };
  };

  const [token, setToken] = useState(AUTH_TOKEN());

  let mensagem = "";

  const mountToken = (valor, campo) => {
    setToken({ ...token, [campo]: valor });
  };

  const [usuario, setUsuario] = useState(CADASTRAR());

  const setValor = (evento, campo) => {
    setUsuario({ ...usuario, [campo]: evento.target.value });
  };

  const login = () =>{
    history.push('/public/login');
  }

  const submeter = (evento) => {

    evento.preventDefault();

    LoginService.signup(usuario, async (retorno) => {
      
      const response = await retorno;

      if(response.data.body.auth){
        console.log(response.data.mensagem)
        mountToken(response.data.body.token, 'x_access_token');
        mountToken(response.data.body.token, 'authorization');
        LoginService.autenticar(token, async (res) => {

          if(res.data.body.auth){
            console.log(res.data.mensagem)
            mountToken(response.data.body.token, 'x_access_token');
            mountToken(response.data.body.token, 'authorization');
          }
          else{
            console.log(res.data.mensagem)
          }
        });
      }
      else{
        console.log(response.data.mensagem)
      }

      mensagem = response.data.mensagem;
      
      history.push('/acess');

    });
    
  };




  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Cadastro
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Nome"
                autoFocus
                value={usuario.nome}
                onChange={(e) => setValor(e, 'nome')}
              />
            </Grid>
    
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="cpf"
                label="Cpf"
                name="cpf"
                autoComplete="cpf"
                value={usuario.cpf}
                onChange={(e) => setValor(e, 'cpf')}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="login"
                label="Login"
                name="login"
                autoComplete="user name"
                value={usuario.login}
                onChange={(e) => setValor(e, 'login')}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
                value={usuario.senha}
                onChange={(e) => setValor(e, 'senha')}
              />
            </Grid>

            <Grid item xs={12}>
            <FormLabel component="legend">Nível Acesso</FormLabel>
            <RadioGroup row aria-label="nivel" name="nivel1"  value={usuario.nivel} onChange={(e) => setValor(e, 'nivel')}>
              <FormControlLabel value="1" control={<Radio />} label="Admin" />
              <FormControlLabel value="2" control={<Radio />} label="Cliente" />
              <FormControlLabel value="0" control={<Radio />} label="Outros" />
            </RadioGroup>
            </Grid>


            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="endereco"
                label="Endereco"
                name="endereco"
                autoComplete="endereco"
                value={usuario.endereco}
                onChange={(e) => setValor(e, 'endereco')}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="telefone"
                label="Telefone"
                name="telefone"
                autoComplete="telefone"
                value={usuario.telefone}
                onChange={(e) => setValor(e, 'telefone')}
              />
            </Grid>

          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => submeter(e)}
          >
            Cadastrar
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="" variant="body2" onClick={() => login()} >
                Você já tem uma Conta? Login!
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
      <h5> {mensagem} </h5>
      </Grid>
    </Grid>
  );
}