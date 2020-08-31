import React, { useContext, useRef } from 'react';
import RestTable from '../../../../components/rest-table';
import { Button, Container, Card, CardContent, CardHeader, makeStyles, Grid } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';
import api from '../../../../services/api';
import { SharedSnackbarContext } from '../../../../providers/snackbar-provider';
import { parseDate } from '../../../../utils/date-format';
import { parseValue } from '../../../../utils/money-format';
import PrecoBase from './preco-base';



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1
    },
    container: {
        padding: theme.spacing(5, 3, 0, 3)
    },
    containerAcao: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: theme.spacing(3, 2)
    }
}));

export default function TabelaPrecos(props) {

    const { codigoProduto, precoBase } = props
    const history = useHistory();
    const childRefPrecoTemporario = useRef();

    const classes = useStyles();

    const { openSnackbar } = useContext(SharedSnackbarContext);
    const abrircadastro = () => {

        history.push('/admin/cadastro-precos', { codigoProduto: codigoProduto })
    }

    const handleEdit = (row) => {

        row.dataInicio = parseDate(row.dataInicio);
        row.dataTermino = parseDate(row.dataTermino);

        history.push('/admin/cadastro-precos', row);
    }

    const handleDelete = (row) => {

        api.delete(`/precoTemporario/${row.idPrecoTemporario}`).then(() => {
            childRefPrecoTemporario.current.reload();

            openSnackbar('Preço temporário excluido com sucesso', 'success');
        }).catch(error => apiError(error));
    }

    const apiError = (error) => {

        const response = error.response;

        if (response && response.status === 400) {

            openSnackbar(response.data.mensagem, 'warning');
        }
        else {

            openSnackbar('Ocorreu um erro não tratado pelo servidor.', 'error');
        }
    }

    const renderPreco = (value) => {

        return 'R$ ' + parseValue(parseFloat(value))
    }


    return (
        <Grid container className={classes.root} >
            <Grid item xs={5}>
                <PrecoBase codigoProduto={codigoProduto} precoBase={precoBase} />
            </Grid>
            <Grid item xs={7}>
                <Card className={classes.card}>
                    <CardHeader title="Preço de venda Temporário" />
                    <CardContent>
                        <RestTable pesquisable={false} ref={childRefPrecoTemporario} data={{
                            key: 'idPrecoTemporario',
                            url: `precoTemporario/${codigoProduto}/`,
                            columns: [
                                { label: 'Código', name: 'idPrecoTemporario' },
                                { label: 'Data Inicio', name: 'dataInicio' },
                                { label: 'Data Fim', name: 'dataTermino' },
                                { label: 'Preço', name: 'preco', render: renderPreco }
                            ], actions: [
                                {
                                    onClick: handleEdit,
                                    icon: <EditIcon color='primary' />,
                                }, {
                                    condition: item => item.dataExclusao == null,
                                    onClick: handleDelete,
                                    icon: <DeleteIcon color='secondary' />,
                                }
                            ]
                        }
                        }>
                            <Button variant="contained" color="primary" onClick={abrircadastro}>
                                <AddIcon />
                                Adicionar
                        </Button>
                        </RestTable>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}
