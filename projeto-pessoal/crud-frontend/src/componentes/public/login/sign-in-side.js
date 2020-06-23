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
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://www.estalagemdomirante.com.br/wp-content/uploads/2016/05/restaurante65-1024x683.jpg)',
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  
  const classes = useStyles();
  const history = useHistory();

  const USUARIO = () => {
    return {
      login: "",
      senha: "",
      nivel: 0
    };
  };

  const AUTH_TOKEN = () => {
    return {
      x_access_token: "",
      authorization: ""
    };
  };

  const [usuario, setUsuario] = useState(USUARIO());

  const [token, setToken] = useState(AUTH_TOKEN());

  let mensagem = "";

  const setValor = (evento, campo) => {
    setUsuario({ ...usuario, [campo]: evento.target.value });
  };

  const mountToken = (valor, campo) => {
    setToken({ ...token, [campo]: valor });
  };

  const cadastrar = () =>{
    history.push('/cadastro');
  }

  const submeter = (evento) => {

    evento.preventDefault();

    LoginService.login(usuario, async (retorno) => {

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
      
      history.push('/');

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
            Entrar
          </Typography>
          <form className={classes.form} onSubmit={(e) => submeter(e)} >


            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="login"
              label="Nome do Usuário"
              name="user_name"
              autoComplete="user name"
              value={usuario.login}
              onChange={(e) => setValor(e, 'login')}
              autoFocus
            />


            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="senha"
              label="Senha"
              type="password"
              id="senha"
              value={usuario.senha}
              onChange={(e) => setValor(e, 'senha')}
              autoComplete="current-password"
            />

             <Grid item xs={12}>
            <FormLabel component="legend">Nível Acesso</FormLabel>
            <RadioGroup row aria-label="nivel" name="nivel1"  value={usuario.nivel} onChange={(e) => setValor(e, 'nivel')}>
              <FormControlLabel value="1" control={<Radio />} label="Admin" />
              <FormControlLabel value="2" control={<Radio />} label="Cliente" />
              <FormControlLabel value="0" control={<Radio />} label="Outros" />
            </RadioGroup>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
             Login
            </Button>

            <h5> {mensagem} </h5>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Esqueceu a Senha?
                </Link>
              </Grid>


              <Button
              type="button"
              fullWidth
              onClick={() => cadastrar()}
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
             Cadastrar
            </Button>

              <Grid item>
                <h7>
                  {"Não tem uma conta? Inscreva-se"}
                </h7>
              </Grid>
            </Grid>


            <Box mt={5}>
              <Copyright />
            </Box>

          </form>

        </div>

      </Grid>

    </Grid>

  );

}