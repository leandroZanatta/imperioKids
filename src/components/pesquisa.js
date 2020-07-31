import React from "react";
import { withStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { Container, TextField, IconButton, Dialog, Toolbar, Typography, TableContainer, TableCell, TableRow, TableHead, Table, TableBody, TablePagination } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import api from '../services/api';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = theme => ({
    root: {
        padding: theme.spacing(0),
        paddingBottom: theme.spacing(1),
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row'
    },
    titlePesquisa: {
        padding: theme.spacing(0),
        paddingLeft: theme.spacing(3),

    },
    containerPesquisa: {
        height: theme.spacing(50)
    },

    toolbar: {
        padding: theme.spacing(0)
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },

    title: {
        textTransform: 'uppercase'
    },

});

class Pesquisa extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            telaPesquisa: false,
            rows: [],
            field: props.id,
            campoPesquisa: '',
            direction: 'asc',
            row: null,
            page: 0,
            registros: 0
        }
    }

    validarEnterPesquisar = (event) => {

        if (event.keyCode === 13) {
            event.preventDefault();

            this.pesquisar();
        }
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleClose = () => {
        this.setState({ telaPesquisa: false });
    };

    handleChangePage = (event, newPage) => {

        this.setState({ page: newPage });

        this.pesquisar();
    };

    pesquisar = () => {
        const me = this;

        const { codigoPesquisa } = this.props
        const { rowsPerPage } = this.props
       
        const { campoPesquisa } = this.state
        const { page } = this.state

        api.get('/pesquisa', {
            params: {
                codigoPesquisa: codigoPesquisa,
                campoPesquisa: campoPesquisa,
                pagina: page,
                registros: rowsPerPage
            }
        }).then(response => {

            const data = response.data;

            if (data.numeroRegistros === 1) {

                let row = data.rows[0];

                me.selecionarLinha(row);

                return;
            }

            me.setState({
                registros: data.numeroRegistros,
                row: null,
                rows: data.rows,
                telaPesquisa: true
            });

        }).catch(function (error) {

        });
    }

    selecionarLinha = (row) => {

        const { formato } = this.props
        const { changeValue } = this.props;

        this.setState({
            row: row,
            campoPesquisa: formato(row),
            telaPesquisa: false
        });

        changeValue(row);
    }

    render() {

        const { classes } = this.props;
        const { titulo } = this.props;
        const { rowsPerPage } = this.props
        const { configs } = this.props

        const { telaPesquisa } = this.state
        const { registros } = this.state
        const { page } = this.state
        const { rows } = this.state

        return (
            <Container className={classes.root}>
                <TextField
                    id="pesquisa"
                    fullWidth={true}
                    value={this.state.campoPesquisa}
                    label={titulo ? titulo : ''}
                    onKeyDown={this.validarEnterPesquisar}
                    onChange={this.handleChange("campoPesquisa")}
                    InputProps={{
                        endAdornment:
                            <IconButton onClick={this.pesquisar}>
                                <SearchIcon color="action" />
                            </IconButton>,
                    }}
                />

                <Dialog
                    fullWidth={true}
                    maxWidth='md'
                    open={telaPesquisa}
                    onClose={this.handleClose}
                    aria-labelledby="max-width-dialog-title"
                >
                    <MuiDialogTitle disableTypography className={classes.titlePesquisa}>
                        <Toolbar className={classes.toolbar}>
                            <Typography component="h2" variant="subtitle1" color="primary" className={classes.title}>
                                {titulo}
                            </Typography>
                            <IconButton onClick={this.handleClose} className={classes.closeButton} >
                                <CloseIcon />
                            </IconButton>
                        </Toolbar>
                    </MuiDialogTitle >
                    <DialogContent>
                        <TableContainer className={classes.containerPesquisa}>
                            <Table size="small" aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {
                                            configs.map((config, index) => <TableCell style={config.style} key={index}>{config.title}</TableCell>)
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row, index) => {
                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={index}
                                                onDoubleClick={event => this.selecionarLinha(row)}
                                            >
                                                {
                                                    configs.map((config, index) =>
                                                        <TableCell
                                                            key={index}
                                                            style={config.style}>
                                                            {config.format(row[config.field])}
                                                        </TableCell>)
                                                }
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[rowsPerPage]}
                            labelDisplayedRows={({ from, to, count }) => `Exibindo registros ${from}-${to} de ${count}`}
                            component="div"
                            backIconButtonText='Página Anterior'
                            nextIconButtonText='Próxima Página'
                            count={registros}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={this.handleChangePage}
                        />
                    </DialogContent>
                </Dialog>
            </Container >

        );
    }
}

export default withStyles(useStyles)(Pesquisa)