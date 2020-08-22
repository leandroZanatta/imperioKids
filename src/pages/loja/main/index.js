import React, { useContext } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from '../../../components/Copyright';
import ItemVenda from './components/item-venda';
import api from '../../../services/api';
import { SharedSnackbarContext } from '../../../providers/snackbar-provider';
import ToolbarApp from './components/toolbar-app';
import { TablePagination } from '@material-ui/core';
import SliderDestaques from './components/slider-destaques';

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },

    heroContent: {
        padding: theme.spacing(2, 0, 6),
    },

    paginacao: {
        display: 'flex',
        alignItems: 'center',
        padding: 0,
        flexDirection: 'column',
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),

    },
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
        },
    },
}));

export default function Loja() {
    const classes = useStyles();

    const { openSnackbar } = useContext(SharedSnackbarContext);
    const [produtos, setProdutos] = React.useState([]);

    const [pagina, setPagina] = React.useState(0);
    const [totalRegistros, setTotalRegistros] = React.useState(0);
    const limit = 40;

    const handleChangePage = (event, newPage) => {

        setPagina(newPage);
    };

    const buscarProdutos = () => {

        api.get('loja/produtos', {
            params: {
                totalRegistros: totalRegistros,
                pagina: pagina,
                limit: limit
            }
        }).then(response => {

            const retorno = response.data;

            setTotalRegistros(retorno.totalElements);
            setProdutos(retorno.content);
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

    React.useEffect(buscarProdutos, []);
    React.useEffect(buscarProdutos, [pagina]);


    return (
        <React.Fragment>
            <CssBaseline />
            <ToolbarApp />

            <Container maxWidth="sm" component="main" className={classes.heroContent}>
                <SliderDestaques />
            </Container>

            <Container maxWidth="md" component="main">
                <Grid container spacing={5} alignItems="flex-end">
                    {produtos.map((row) => <ItemVenda key={row.descricao} row={row} />)}
                </Grid>
            </Container>

            <Container maxWidth="md" component="footer" className={classes.paginacao}>
                <TablePagination
                    rowsPerPageOptions={[limit]}
                    labelDisplayedRows={({ from, to, count }) => `Exibindo Produtos ${from}-${to} de ${count}`}
                    component="div"
                    backIconButtonText='Página Anterior'
                    nextIconButtonText='Próxima Página'
                    count={totalRegistros}
                    rowsPerPage={limit}
                    page={pagina}
                    onChangePage={handleChangePage}
                />

            </Container>

            <Container maxWidth="md" component="footer" className={classes.footer}>
                <Copyright />
            </Container>

        </React.Fragment>
    );
}