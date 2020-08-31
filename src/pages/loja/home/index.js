import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { TablePagination } from '@material-ui/core';
import { SharedSnackbarContext } from '../../../providers/snackbar-provider';
import api from '../../../services/api';
import ItemVenda from './components/item-venda';
import SliderDestaques from './components/slider-destaques';
import { useParams, useLocation } from 'react-router-dom';
import Categorias from './components/categorias';
import Destaques from './components/destaques';

const useStyles = makeStyles((theme) => ({

    root: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: theme.spacing(1)
    },
    menuLateral: {
        width: 350,
        '& > div': {
            padding: theme.spacing(0)
        }
    },
    heroContent: {
        padding: theme.spacing(2, 0, 6),
        display: 'none',
    },

    paginacao: {
        display: 'flex',
        alignItems: 'center',
        padding: 0,
        flexDirection: 'column',
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),

    },
}));

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function HomePage() {
    const classes = useStyles();

    const query = useQuery();

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
        <div>

            <Container className={classes.root}>
                <Container className={classes.menuLateral}>
                    <Destaques destaqueSelecionado={query.get('destaque')} />
                    <Categorias categoriaSelecionada={query.get('categoria')} />
                </Container>
                <Container>
                    <Container maxWidth="sm" component="main" className={classes.heroContent}>

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
                </Container>
            </Container>
        </div>
    );
}