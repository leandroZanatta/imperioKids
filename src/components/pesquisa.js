import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, IconButton, Paper, TableContainer, TablePagination, Table, TableHead, TableRow, TableBody, TableCell, Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import api from '../services/api';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    dialog: {
        width: 800,
        maxHeight: 500
    }

}));

function SimpleDialog(props) {

    const classes = useStyles();
    const { onClose, open, titulo, data } = props;
    const [rows, setRows] = React.useState([]);
    const [valorPesquisa, setValorPesquisa] = React.useState('');
    const [page, setPage] = React.useState(0);
    const [registros, setRegistros] = React.useState(0);
    React.useEffect(() => pesquisar(), []);
    React.useEffect(() => pesquisar(), [page]);


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

        api.get(data.url, {
            params: {
                valorPesquisa: valorPesquisa,
                pagina: page,
                registros: data.numerolinhas
            }
        }).then(response => {

            const retorno = response.data;

            setRegistros(retorno.totalElements);
            setRows(retorno.content);

        }).catch(function (error) {

        });
    }


    const handleClose = () => {
        onClose(null);
    };

    const handleItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog
            onClose={handleClose}
            open={open}
            maxWidth="false"
            aria-labelledby="simple-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="simple-dialog-title">Pesquisa de {titulo}</DialogTitle>
            <DialogContent className={classes.dialog}>
                <TableContainer component={Paper} >
                    <TextField
                        id="pesquisa"
                        value={valorPesquisa}
                        onKeyDown={validarEnterPesquisar}
                        onChange={handleChange}
                        fullWidth
                        InputProps={{
                            endAdornment:
                                <IconButton onClick={pesquisarValor}>
                                    <SearchIcon color="action" />
                                </IconButton>,
                        }}
                    />
                    <Table stickyHeader >
                        <TableHead>
                            <TableRow key={data.key} >
                                {
                                    data.columns.map((item) => <TableCell>{item.label}</TableCell>)
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                rows.map((row) => (
                                    <TableRow key={row[data.key]} onClick={() => handleItemClick(row)}>
                                        {
                                            data.columns.map((column) => <TableCell>{row[column.name]}</TableCell>)
                                        }
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[data.numerolinhas]}
                        labelDisplayedRows={({ from, to, count }) => `Exibindo registros ${from}-${to} de ${count}`}
                        component="div"
                        backIconButtonText='Página Anterior'
                        nextIconButtonText='Próxima Página'
                        count={registros}
                        rowsPerPage={data.numerolinhas}
                        page={page}
                        onChangePage={handleChangePage}
                    />
                </TableContainer>
            </DialogContent>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
    titulo: PropTypes.string.isRequired,
    data: PropTypes.string.isRequired
};

export default function Pesquisa(props) {
    const [open, setOpen] = React.useState(false);
    const { titulo, data, onValueChange, formatValue } = props;
    const [selectedValue, setSelectedValue] = React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);

        let valueString = value != null ? formatValue(value) : '';

        setSelectedValue(valueString)

        onValueChange(value);
    };

    return (
        <div>
            <TextField
                id="pesquisa"
                fullWidth={true}
                value={selectedValue}
                label={titulo ? titulo : ''}
                InputProps={{
                    endAdornment:
                        <IconButton size='small' onClick={handleClickOpen}>
                            <SearchIcon color="action" />
                        </IconButton>
                }}
            />

            <SimpleDialog titulo={titulo} data={data} open={open} onClose={handleClose} />
        </div>
    );
}


