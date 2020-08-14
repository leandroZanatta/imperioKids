import React, { useContext } from 'react';
import RestTable from '../../../../components/rest-table';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CachedIcon from '@material-ui/icons/Cached';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';
import api from '../../../../services/api';
import { SharedSnackbarContext } from '../../../../providers/snackbar-provider';
import { Button } from '@material-ui/core';

export default function TabelaCategorias() {

    const history = useHistory();
    const { openSnackbar } = useContext(SharedSnackbarContext);

    const abrircadastro = () => {

        history.push('/admin/cadastro-categorias')
    }

    const handleEdit = (row) => {

        history.push('/admin/cadastro-categorias', row);
    }

    const handleDelete = (row) => {

        api.delete(`/categorias/${row.idCategoria}`).then(() => {
            row.dataExclusao = new Date();
            openSnackbar('Categoria excluida com sucesso', 'success');
        }).catch(error => apiError(error));
    }

    const handleReinclude = (row) => {

        api.put(`/categorias/${row.idCategoria}`).then(() => {
            row.dataExclusao = null;
            openSnackbar('Categoria reincluida com sucesso', 'success');
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
                key: 'idCategoria',
                url: 'categorias',
                columns: [
                    { label: 'Código', name: 'idCategoria' },
                    { label: 'Categoria Pai', name: 'descricaoPai' },
                    { label: 'Descrição', name: 'descricao' }
                ], actions: [
                    {
                        onClick: handleEdit,
                        icon: <EditIcon color='primary' />,
                    }, {
                        condition: item => item.dataExclusao == null,
                        onClick: handleDelete,
                        icon: <DeleteIcon color='secondary' />,
                    }, {
                        condition: item => item.dataExclusao != null,
                        onClick: handleReinclude,
                        icon: <CachedIcon color='primary' />,
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
