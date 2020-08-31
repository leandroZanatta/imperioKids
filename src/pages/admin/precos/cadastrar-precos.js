import React, { useContext } from 'react';
import { TextField, Container, makeStyles, Paper, Button, InputLabel, FormControl, Input, FormControlLabel } from '@material-ui/core';
import api from '../../../services/api';
import { useHistory } from 'react-router-dom';
import { SharedSnackbarContext } from '../../../providers/snackbar-provider';
import MoneyInput from '../../../components/money-input';
import { setHours, parseDate } from '../../../utils/date-format';


const useStyles = makeStyles((theme) => ({
    currency: {
        marginTop: 16,
        background: 'none',
        height: 30,
        border: 'none'
    },
    formControl: {
        marginTop: theme.spacing(1),
        height: 45
    },
    container: {
        padding: theme.spacing(5, 3, 0, 3)
    },
    containerAcao: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: theme.spacing(3, 0)
    }
}));

export default function CadastroPrecos(props) {

    let dataAtual = new Date();
    let novoDia = new Date();
    novoDia.setDate(dataAtual.getDate() + 1)

    const dataEmpty = {
        idPrecoTemporario: '',
        codigoProduto: '',
        preco: 0,
        dataInicio: parseDate(dataAtual),
        dataTermino: setHours(novoDia, '00', '00')
    };

    const { state } = props.location;

    const [data, setData] = React.useState(Object.assign(dataEmpty, state));
    const { openSnackbar } = useContext(SharedSnackbarContext);

    const history = useHistory();
    const classes = useStyles();


    const handleChange = (event) => {

        setData({ ...data, [event.target.name]: event.target.value });
    }



    const handleSubmit = (event) => {

        api.post(`precoTemporario/${data.codigoProduto}`, data)
            .then(() => {

                openSnackbar('Preço temporário cadastrado com sucesso', 'success');

                history.goBack()
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
                    name='idPrecoTemporario'
                    value={data.idPrecoTemporario}
                    label="Código"
                    disabled={true}
                />

                <MoneyInput
                    fullWidth
                    autoFocus
                    label="Preço"
                    name='preco'
                    value={data.preco}
                    onChange={(valor) => handleChange({ target: { name: 'preco', value: valor } })}
                />

                <TextField
                    type="datetime-local"
                    defaultValue={data.dataInicio}
                    name='dataInicio'
                    onChange={handleChange}
                    fullWidth={true}
                    label="Data de Início"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    type="datetime-local"
                    name='dataTermino'
                    defaultValue={data.dataTermino}
                    onChange={handleChange}
                    fullWidth={true}
                    label="Data Fim"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Container className={classes.containerAcao}>
                    <Button
                        onClick={handleSubmit}
                        variant='contained'
                        color='primary'>
                        Salvar
                    </Button>
                    <Button
                        onClick={() => history.goBack()}
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
