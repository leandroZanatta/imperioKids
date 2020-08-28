import React, { useContext, forwardRef, useImperativeHandle } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TableHead, makeStyles, Checkbox, IconButton } from '@material-ui/core';
import api from '../../../../services/api';
import { SharedSnackbarContext } from '../../../../providers/snackbar-provider';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({

    cabecalho: {
        display: 'flex',
        padding: theme.spacing(2)
    },
    cabecalhoBotoes: {
        padding: theme.spacing(0, 2, 0, 0)
    }
}));




const TabelaImagens = forwardRef((props, ref) => {
    useImperativeHandle(
        ref,
        () => ({
            reload() {
                pesquisar();
            }
        }),
    )
    const classes = useStyles();

    const { children, codigoProduto } = props;
    const [rows, setRows] = React.useState([]);
    const { openSnackbar } = useContext(SharedSnackbarContext);


    const handleChange = (checked, row) => {

        if (!checked) {
            openSnackbar('Não é possivel desmarcar a imagem.', 'warning');

            return;
        }

        api.put(`/produtos/${codigoProduto}/imagem/${row.idImagemProduto}`).then(response => {

            rows.forEach(item => item.imagemPrincipal = item.idImagemProduto === row.idImagemProduto);

            openSnackbar('Imagem alterada com sucesso.', 'success');
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

    const pesquisar = () => {

        api.get(`/produtos/imagem/${codigoProduto}`).then(response => {

            const retorno = response.data;

            setRows(retorno);
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

    const excluirImagem = (row) => {


        api.delete(`/produtos/imagem/${row.idImagemProduto}`).then(response => {

            setRows(rows.filter(item => item.idImagemProduto != row.idImagemProduto));

            openSnackbar('Imagem excluida com sucesso.', 'success');
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

    React.useEffect(pesquisar, []);

    return (
        <TableContainer component={Paper}>
            <div className={classes.cabecalho}>
                <div className={classes.cabecalhoBotoes}>
                    {children}
                </div>
            </div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Exibição</TableCell>
                        <TableCell>Código</TableCell>
                        <TableCell>Localização</TableCell>
                        <TableCell>Imagem</TableCell>
                        <TableCell>Ações</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        rows.map((row) => (
                            <TableRow>
                                <TableCell>
                                    <Checkbox
                                        checked={row.imagemPrincipal}
                                        onChange={(event, checked) => handleChange(checked, row)}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                </TableCell>
                                <TableCell>{row.idImagemProduto}</TableCell>
                                <TableCell>{row.local}</TableCell>
                                <TableCell><img src={row.local} height={50} alt="" /></TableCell>
                                <TableCell>
                                    <IconButton onClick={() => excluirImagem(row)} style={{ paddingLeft: 5, paddingRight: 5, paddingTop: 0, paddingBottom: 0 }}>
                                        <DeleteIcon color='secondary' />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer >
    );
})

export default TabelaImagens;
