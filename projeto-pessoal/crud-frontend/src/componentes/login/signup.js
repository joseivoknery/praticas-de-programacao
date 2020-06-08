import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import Copyright from '../copyright';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://www.estalagemdomirante.com.br/wp-content/uploads/2016/05/restaurante65-1024x683.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
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

function SignUp() {
  
  const classes = useStyles();

  const criaFormEmBranco = () => {
    return {
      login: "",
      senha: "",
      nivel: 0
    };
  };

  const [form, setForm] = useState(criaFormEmBranco());

  const setValor = (evento, campo) => {
    setForm({ ...form, [campo]: evento.target.value });
  };


  const submeter = (evento) => {

    evento.preventDefault();

    LoginService.login(form, () => {
        history.push('/');
      });
    }

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
          Entre
        </Typography>
        <form className={classes.form} noValidate onSubmit={(e) => submeter(e)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="login"
            value={form.login}
            onChange={(e) => setValor(e, 'login')}
            label="Nome Usuário"
            name="login"
            autoComplete="user name"
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
            id="password"
            value={form.senha}
            onChange={(e) => setValor(e, 'senha')}
            autoComplete="current-password"
          />
          
          <FormLabel component="legend">Nível Acesso</FormLabel>
          <RadioGroup aria-label="nivel" name="nivel1"  value={form.nivel} onChange={(e) => setValor(e, 'nivel')}>
            <FormControlLabel value="1" control={<Radio />} label="Admin" />
            <FormControlLabel value="2" control={<Radio />} label="Cliente" />
            <FormControlLabel value="0" control={<Radio />} label="Outros" />
          </RadioGroup> 
  
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Lembre-me"/>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>

          <Grid container>

            <Grid item xs>
              <Link href="#" variant="body2">
                Esqueceu a senha?
              </Link>
            </Grid>

            <Grid item>
              <Link href="#" variant="body2">
                {"Você não tem uma Conta? Crie uma"}
              </Link>
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

export default SignUp;