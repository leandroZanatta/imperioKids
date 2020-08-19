import React, { useContext } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TableHead, makeStyles, Checkbox } from '@material-ui/core';
import api from '../../../../services/api';
import { SharedSnackbarContext } from '../../../../providers/snackbar-provider';

const useStyles = makeStyles((theme) => ({

    cabecalho: {
        display: 'flex',
        padding: theme.spacing(2)
    },
    cabecalhoBotoes: {
        padding: theme.spacing(0, 2, 0, 0)
    }
}));

const handleChange = () => {

}



export default function TabelaImagens(props) {
    const classes = useStyles();

    const { children, codigoProduto } = props;
    const [rows, setRows] = React.useState([]);
    const { openSnackbar } = useContext(SharedSnackbarContext);

    React.useEffect(() => pesquisar(), []);


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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        rows.map((row) => (
                            <TableRow>
                                <TableCell>
                                    <Checkbox
                                        checked={row.imagemPrincipal}
                                        onChange={handleChange}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                </TableCell>
                                <TableCell>{row.idImagemProduto}</TableCell>
                                <TableCell>{row.local}</TableCell>
                                <TableCell><img src={`${row.type},${row.content}`} height={50} /></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer >
    );
}
