import React, { useContext } from 'react';
import RestTable from '../../../../components/rest-table';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CachedIcon from '@material-ui/icons/Cached';
import AddIcon from '@material-ui/icons/Add';
import ImageIcon from '@material-ui/icons/Image';
import { useHistory } from 'react-router-dom';
import { SharedSnackbarContext } from '../../../../providers/snackbar-provider';
import api from '../../../../services/api';
import priceImg from '../../../../assets/price.png';
export default function TabelaProdutos() {

    const history = useHistory();
    const { openSnackbar } = useContext(SharedSnackbarContext);

    const abrircadastro = () => {

        history.push('/admin/cadastro-produtos')
    }

    const handleEdit = (row) => {

        history.push('/admin/cadastro-produtos', row);
    }

    const viewPrice = (row) => {

        history.push('/admin/listar-precos', row);
    }

    const handleImages = (row) => {

        history.push('/admin/cadastro-produtos-imagem', row);
    }

    const handleDelete = (row) => {

        api.delete(`/produtos/${row.idProduto}`).then(() => {
            row.dataExclusao = new Date();
            openSnackbar('Produto excluido com sucesso', 'success');
        }).catch(error => apiError(error));
    }

    const handleReinclude = (row) => {

        api.put(`/produtos/${row.idProduto}`).then(() => {
            row.dataExclusao = null;
            openSnackbar('Produto reincluido com sucesso', 'success');
        }).catch(error => apiError(error));
    }

    const montarEstrutura = (estrutura) => {

        if (estrutura) {
            return estrutura.map(item => <span key={item.idCategoria}>{item.descricao + '/'}</span>)
        }

        return <span>/</span>
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
                key: 'idProduto',
                url: 'produtos',
                columns: [
                    { label: 'Código', name: 'idProduto' },
                    { label: 'Estrutura Mercadologica', name: 'estruturaMercadologica', render: montarEstrutura },
                    { label: 'Descrição', name: 'descricao' }
                ],
                actionWidth: 180,
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
                    }, {
                        onClick: handleImages,
                        icon: <ImageIcon color='primary' />,
                    }, {
                        onClick: viewPrice,
                        icon: <img src={priceImg} width={25} height={25} />

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
