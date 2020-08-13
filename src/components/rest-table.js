import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TableHead, TextField, IconButton, TablePagination } from '@material-ui/core';
import api from '../services/api';
import SearchIcon from '@material-ui/icons/Search';
import RowItem from './row-item';


export default function RestTable(props) {

    const [rows, setRows] = React.useState([]);
    const numerolinhas = 5;
    const [valorPesquisa, setValorPesquisa] = React.useState('');
    const [page, setPage] = React.useState(0);
    const [registros, setRegistros] = React.useState(0);

    const pesquisarValor = () => {

        if (page === 0) {
            pesquisar();

            return;
        }

        setPage(0);
    }

    const validarEnterPesquisar = (event) => {

        if (event.keyCode === 13) {
            event.preventDefault();

            pesquisarValor();
        }
    }
    const handleChange = (event) => {

        setValorPesquisa(event.target.value);
    };


    const handleChangePage = (event, newPage) => {

        setPage(newPage);
    };


    const pesquisar = () => {

        api.get(props.data.url, {
            params: {
                valorPesquisa: valorPesquisa,
                pagina: page,
                registros: numerolinhas
            }
        }).then(response => {

            const data = response.data;

            setRegistros(data.totalElements);
            setRows(data.content);

        }).catch(function (error) {

        });
    }
    React.useEffect(() => pesquisar(), []);
    React.useEffect(() => pesquisar(), [page]);

    return (
        <TableContainer component={Paper}>
            <TextField
                id="pesquisa"
                value={valorPesquisa}
                onKeyDown={validarEnterPesquisar}
                onChange={handleChange}
                InputProps={{
                    endAdornment:
                        <IconButton onClick={pesquisarValor}>
                            <SearchIcon color="action" />
                        </IconButton>,
                }}
            />
            <Table>
                <TableHead>
                    <TableRow key={props.data.key}>
                        {
                            props.data.columns.map((item) => <TableCell>{item.label}</TableCell>)
                        }
                        {props.data.actions &&

                            < TableCell > Ações</TableCell>

                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        rows.map((row) => (
                            <TableRow key={row[props.data.key]}>
                                {
                                    props.data.columns.map((column) => <TableCell>{row[column.name]}</TableCell>)
                                }{props.data.actions &&
                                    <TableCell > {

                                        props.data.actions.map(item => <RowItem onClick={() => item.onClick(row)} icon={item.icon} />)

                                    } </TableCell>
                                }
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[numerolinhas]}
                labelDisplayedRows={({ from, to, count }) => `Exibindo registros ${from}-${to} de ${count}`}
                component="div"
                backIconButtonText='Página Anterior'
                nextIconButtonText='Próxima Página'
                count={registros}
                rowsPerPage={numerolinhas}
                page={page}
                onChangePage={handleChangePage}
            />
        </TableContainer >
    );
}
