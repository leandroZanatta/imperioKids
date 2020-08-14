import React, { useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Copyright from '../../../components/Copyright';
import api from '../../../services/api';
import { autenticarUsuario } from '../../../services/auth'
import { SharedSnackbarContext } from '../../../providers/snackbar-provider';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));



export default function Login(props) {
    const classes = useStyles();
    const { openSnackbar } = useContext(SharedSnackbarContext);

    const [data, setData] = React.useState({ usuario: '', senha: '' });
    const { history } = props;

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    }

    const autenticar = (evt) => {

        evt.preventDefault();

        api.post('/autenticacao', { usuario: data.usuario, senha: data.senha })
            .then(function (response) {

                autenticarUsuario(response.data);

                openSnackbar('Usuário autenticado com sucesso', 'success');

                history.push('/admin/home');
            })
            .catch(function (error) {

                let response = error.response;

                if (response.status === 400) {

                    openSnackbar(response.data.mensagem, 'warning');
                } else {

                    openSnackbar('Ocorreu um erro não tratado pelo servidor', 'error');
                }
            });
    }

    return (
        <Container component="main" maxWidth="xs" >
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>

                </Avatar>
                <Typography component="h1" variant="h5">
                    Autenticação
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="usuario"
                        label="Usuário"
                        name="usuario"
                        autoComplete="usuario"
                        autoFocus
                        value={data.usuario}
                        onChange={handleChange}
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
                        autoComplete="senha"
                        value={data.senha}
                        onChange={handleChange}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={autenticar}
                    >
                        Login
                    </Button>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    )
}