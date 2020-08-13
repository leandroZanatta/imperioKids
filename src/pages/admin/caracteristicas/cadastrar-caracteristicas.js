import React, { useContext } from 'react';
import { TextField, Container, makeStyles, Paper, Snackbar, Button } from '@material-ui/core';
import api from '../../../services/api';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import { SharedSnackbarContext } from '../../../providers/snackbar-provider';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(5, 3, 0, 3)
    },
    containerAcao: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: theme.spacing(3, 0)
    }
}));

export default function CadastrarCaracteristicas() {

    const [data, setData] = React.useState({ idCaracteristica: null, descricao: '' });
    const [alert, setAlert] = React.useState({ mensagem: '', type: 'warning' });
    const [open, setOpen] = React.useState(false);
    const { openSnackbar } = useContext(SharedSnackbarContext);

    const history = useHistory();

    const classes = useStyles();

    const vertical = 'top';
    const horizontal = 'center';


    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const openAlert = (alert) => {

        setAlert(alert);

        setOpen(true);
    }

    const goBack = () => {

        history.push('/admin/caracteristicas');
    }

    const handleSubmit = (event) => {

        api.post('caracteristicas', data)
            .then(function (response) {

                openSnackbar('Característica cadastrada com sucesso');

                goBack();
            })
            .catch(function (error) {

                let response = error.response;

                if (response && response.status === 400) {

                    openAlert({ mensagem: response.data.mensagem, type: 'warning' });
                } else {
                    openAlert({ mensagem: 'Ocorreu um erro não tratado pelo servidor.', type: 'error' });
                }
            });
    }

    return (
        <Paper className={classes.container}>

            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical, horizontal }}
                key={`${vertical},${horizontal}`}
            >
                <MuiAlert elevation={6} variant="filled" severity={alert.type}>
                    {alert.mensagem}
                </MuiAlert>
            </Snackbar>

            <form noValidate>
                <TextField
                    name='idCaracteristica'
                    value={data.idCaracteristica}
                    label="Código"
                    disabled={true}
                />
                <TextField
                    name='descricao'
                    value={data.descricao}
                    onChange={handleChange}
                    fullWidth
                    label="Descrição"
                />
                <Container fullWidth className={classes.containerAcao}>
                    <Button
                        onClick={handleSubmit}
                        variant='contained'
                        color='primary'>
                        Salvar
                    </Button>
                    <Button
                        onClick={goBack}
                        style={{ marginLeft: 5 }}
                        variant='contained'
                        color='secondary'>
                        Cancelar
                    </Button>
                </Container>
            </form>
        </Paper >


    );
}
