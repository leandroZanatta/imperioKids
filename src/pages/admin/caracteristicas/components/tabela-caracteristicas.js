import React, { useContext } from 'react';
import RestTable from '../../../../components/rest-table';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CachedIcon from '@material-ui/icons/Cached';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import api from '../../../../services/api';
import { SharedSnackbarContext } from '../../../../providers/snackbar-provider';

export default function TabelaCaracteristicas() {

    const history = useHistory();
    const { openSnackbar } = useContext(SharedSnackbarContext);

    const abrircadastro = () => {

        history.push('/admin/cadastro-caracteristicas')
    }

    const handleEdit = (row) => {

        history.push('/admin/cadastro-caracteristicas', row);
    }

    const handleDelete = (row) => {

        api.delete(`/caracteristicas/${row.idCaracteristica}`).then(() => {
            row.dataExclusao = new Date();
            openSnackbar('Característica excluida com sucesso', 'success');
        }).catch(error => apiError(error));
    }

    const handleReinclude = (row) => {

        api.put(`/caracteristicas/${row.idCaracteristica}`).then(() => {
            row.dataExclusao = null;
            openSnackbar('Característica reincluida com sucesso', 'success');
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
                key: 'idCaracteristica',
                url: 'caracteristicas',
                columns: [
                    { label: 'Código', name: 'idCaracteristica' },
                    { label: 'Descrição', name: 'descricao' }
                ],
                actionWidth: 120,
                actions: [
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
