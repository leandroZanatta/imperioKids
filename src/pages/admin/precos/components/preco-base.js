import MoneyInput from '../../../../components/money-input';
import { Card, CardHeader, CardContent, Container, Button, makeStyles } from '@material-ui/core';
import RestTable from '../../../../components/rest-table';
import React, { useRef, useContext } from 'react';
import { parseValue } from '../../../../utils/money-format';
import { SharedSnackbarContext } from '../../../../providers/snackbar-provider';
import api from '../../../../services/api';


const useStyles = makeStyles((theme) => ({
    containerPreco: {
        display: 'flex',
        flexDirection: 'row'
    },
    containerAcao: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: 120,
        paddingTop: 12
    }
}));

export default function PrecoBase(props) {

    const { codigoProduto } = props;

    let precoBase = props.precoBase;

    const [novoPrecoBase, setNovoPrecoBase] = React.useState(precoBase);
    const [botaoSalvarDesabilitado, setBotaoSalvarDesabilitado] = React.useState(true);
    const childRef = useRef();
    const classes = useStyles();
    const { openSnackbar } = useContext(SharedSnackbarContext);

    const handleChange = (value) => {
        setNovoPrecoBase(value)

        setBotaoSalvarDesabilitado(precoBase == value);
    }

    const handleSubmit = () => {

        api.post(`historicoPreco/${codigoProduto}`, novoPrecoBase)
            .then(() => {
                openSnackbar('Preço de venda alterado com sucesso', 'success');

                precoBase = novoPrecoBase;

                setBotaoSalvarDesabilitado(precoBase == novoPrecoBase);

                childRef.current.reload();
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

    const renderPreco = (value) => {

        return 'R$ ' + parseValue(parseFloat(value))
    }

    return (
        <Card>
            <CardHeader title="Preço de venda" />
            <CardContent className={classes.containerPreco}>
                <MoneyInput
                    autoFocus
                    fullWidth
                    label="Preço Base"
                    name='precoBase'
                    value={novoPrecoBase}
                    onChange={handleChange}
                />
                <Container className={classes.containerAcao}>
                    <Button
                        onClick={handleSubmit}
                        variant='contained'
                        disabled={botaoSalvarDesabilitado}
                        color='primary'
                    >
                        Salvar
                </Button>
                </Container>
            </CardContent>


            <RestTable pesquisable={false} ref={childRef} data={{
                key: 'idHistoricoPrecos',
                url: `historicoPreco/${codigoProduto}/`,
                columns: [
                    { label: 'Data Cadastro', name: 'dataCadastro' },
                    { label: 'Preço', name: 'preco', render: renderPreco }
                ]
            }
            } />


        </Card>
    )
}