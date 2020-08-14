import React, { useContext } from 'react';
import { TextField, Container, makeStyles, Paper, Button } from '@material-ui/core';
import api from '../../../services/api';
import { useHistory } from 'react-router-dom';
import Pesquisa from '../../../components/pesquisa';
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

export default function CadastrarCategorias() {

    const [data, setData] = React.useState({ idCategoria: '', descricao: '' });
    const { openSnackbar } = useContext(SharedSnackbarContext);

    const history = useHistory();
    const classes = useStyles();


    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    }

    const goBack = () => {

        history.push('/admin/categorias');
    }

    const handleSubmit = (event) => {

        api.post('categorias', data)
            .then(() => {

                openSnackbar('Categoria cadastrada com sucesso', 'success');

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
                    name='idCategoria'
                    value={data.idCategoria}
                    label="Código"
                    disabled={true}
                />
                <Pesquisa
                    codigoPesquisa={1}
                    rowsPerPage={20}
                    onValueChange={(item) => setData({ ...data, codigoCategoria: item != null ? item.idCategoria : null })}
                    formatValue={(item) => item.idCategoria + ' - ' + item.descricao}
                    data={{
                        numerolinhas: 20,
                        key: 'idCategoria',
                        url: 'categorias',
                        columns: [
                            { label: 'Código', name: 'idCategoria' },
                            { label: 'Descrição', name: 'descricao' }
                        ]
                    }}
                    titulo="Categoria" />
                <TextField
                    name='descricao'
                    value={data.descricao}
                    onChange={handleChange}
                    fullWidth={true}
                    label="Descrição"
                />
                <Container className={classes.containerAcao}>
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
