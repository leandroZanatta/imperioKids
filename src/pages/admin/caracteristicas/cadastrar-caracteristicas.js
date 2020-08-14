import React, { useContext } from 'react';
import { TextField, Container, makeStyles, Paper, Button } from '@material-ui/core';
import api from '../../../services/api';
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
    const { openSnackbar } = useContext(SharedSnackbarContext);
    const history = useHistory();
    const classes = useStyles();

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    }

    const goBack = () => {

        history.push('/admin/caracteristicas');
    }

    const handleSubmit = (event) => {

        api.post('caracteristicas', data)
            .then(() => {

                openSnackbar('Característica cadastrada com sucesso', 'success');

                goBack();
            })
            .catch((error) => {

                let response = error.response;

                if (response && response.status === 400) {

                    openSnackbar(response.data.mensagem, 'warning');
                } else {
                    openSnackbar('Ocorreu um erro não tratado pelo servidor.', 'error');
                }
            });
    }

    return (
        <Paper className={classes.container}>

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
