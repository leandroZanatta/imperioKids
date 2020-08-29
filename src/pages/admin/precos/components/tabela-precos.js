import React, { useContext } from 'react';
import RestTable from '../../../../components/rest-table';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';
import api from '../../../../services/api';
import { SharedSnackbarContext } from '../../../../providers/snackbar-provider';

export default function TabelaPrecos(props) {

    const { codigoProduto } = props
    const history = useHistory();
    const { openSnackbar } = useContext(SharedSnackbarContext);
    const abrircadastro = () => {

        history.push('/admin/cadastro-precos', { codigoProduto: codigoProduto })
    }

    const handleEdit = (row) => {

        history.push('/admin/cadastro-precos', row);
    }

    const handleDelete = (row) => {

        api.delete(`/produto-precos/${row.idProdutoPreco}`).then(() => {
            openSnackbar('Produto excluido com sucesso', 'success');
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

    return (
        <div>
            <RestTable data={{
                key: 'idProdutoPreco',
                url: `produto-precos/${codigoProduto}/`,
                columns: [
                    { label: 'Código', name: 'idCategoria' },
                    { label: 'Descrição', name: 'descricao' },
                    { label: 'Produtos', name: 'numeroProdutos' }
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
        </div>
    );
}
