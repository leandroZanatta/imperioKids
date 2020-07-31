import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Copyright from '../../../components/Copyright';
import api from '../../../services/api';
import { autenticarUsuario } from '../../../services/auth'
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = theme => ({
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
});

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            usuario: '',
            senha: '',
            open: false,
            mensagem: '',
            type: 'success',
            vertical: 'top',
            horizontal: 'center',
        }
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    autenticar = (evt) => {

        evt.preventDefault();

        var me = this;

        api.post('/autenticacao', {
            usuario: this.state.usuario,
            senha: this.state.senha
        })
            .then(function (response) {

                autenticarUsuario(response.data);

                me.props.history.push('/admin/home')
            })
            .catch(function (error) {

                let response = error.response;

                if (response.status === 400) {

                    me.setState({
                        open: true,
                        mensagem: response.data.mensagem,
                        type: 'warning'
                    });

                } else {
                    me.setState({
                        open: true,
                        mensagem: 'Ocorreu um erro não tratado pelo servidor',
                        type: 'error'
                    });
                }
            });
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };

    render() {

        const { classes } = this.props;
        const { vertical, horizontal } = this.state;

        return (
            <Container component="main" maxWidth="xs" >

                <Snackbar
                    open={this.state.open}
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                    anchorOrigin={{ vertical, horizontal }}
                    key={`${vertical},${horizontal}`}
                >
                    <MuiAlert elevation={6} variant="filled" severity={this.state.type}>
                        {this.state.mensagem}
                    </MuiAlert>
                </Snackbar>

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
                            value={this.state.usuario}
                            onChange={this.handleChange("usuario")}
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
                            value={this.state.senha}
                            onChange={this.handleChange("senha")}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.autenticar}
                        >
                            Login
                        </Button>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
        );
    }
}

export default withStyles(useStyles)(Login)