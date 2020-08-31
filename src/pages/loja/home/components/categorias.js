import React from 'react';
import { makeStyles, Checkbox, Paper, Card, CardHeader, CardContent } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import api from '../../../../services/api';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { adicionarParametroURL } from '../../../../utils/url-parameters';

const useStyles = makeStyles((theme) => ({

    menuDetails: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(0)
    },

    acordion: {
        padding: 0,
        '&$expanded': {
            height: 40,
            margin: 'auto',
            minHeight: 40,
        },
        '&:first-child': {
            borderRadius: 0,
            boxShadow: 'none'
        }
    },

    acordionSumary: {
        height: 40,
        minHeight: 40,
        paddingLeft: 0,
        borderBottom: '1px solid #CCC',
        backgroundColor: '#DEDEDE'
    },

    acordionDetails: {
        display: 'flex',
        flexDirection: 'column',
        padding: 0
    },

    cardCategoria: {
        display: 'flex',
        flexDirection: 'row',
        height: 40,
        minHeight: 40,
        backgroundColor: '#FFF',
        borderRadius: 0,
        boxShadow: 'none',
        borderBottom: '1px solid #CCC',
        backgroundColor: '#DEDEDE'
    },

    descricaoCategoria: {
        paddingTop: 10
    }
}));


export default function Categorias(props) {

    const classes = useStyles();
    const [categorias, setCategorias] = React.useState([]);
    const { categoriaSelecionada } = props;
    const history = useHistory();
    const url = useLocation().search;

    const pesquisar = () => {

        api.get('categorias/estrutura').then(response => {
            setCategorias(response.data);
        }).catch(function (error) {

        });
    }

    React.useEffect(pesquisar, []);

    const isCategoriaSelecionada = (categoria) => {
        return categoriaSelecionada && parseInt(categoriaSelecionada) === categoria.codigoCategoria;
    }

    const renderCheckbox = (categoria) => {

        return (
            <Checkbox
                color="primary"
                checked={isCategoriaSelecionada(categoria)}
                inputProps={{ 'aria-label': 'secondary checkbox' }}
                onClick={(event) => {
                    event.stopPropagation();

                    history.push(`/loja/${adicionarParametroURL(url, 'categoria', categoria.codigoCategoria)}`)
                }}
            />
        )
    }

    const renderAcordionCategorias = (categoria) => {

        return (
            <div className={classes.root}>
                <Accordion className={classes.acordion}>
                    <AccordionSummary
                        className={classes.acordionSumary}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        {
                            renderCheckbox(categoria)
                        }
                        <Typography className={classes.descricaoCategoria}>{categoria.descricao}</Typography>
                    </AccordionSummary>
                    <AccordionDetails className={classes.acordionDetails}>
                        {
                            categoria.subcategorias.map(subcategoria => renderCategoria(subcategoria))
                        }
                    </AccordionDetails>
                </Accordion>
            </div>
        )
    }

    const renderComponentCategorias = (categoria) => {

        return (

            <Paper className={classes.cardCategoria}>
                {
                    renderCheckbox(categoria)
                }
                <Typography className={classes.descricaoCategoria}>{categoria.descricao}</Typography>

            </Paper>
        )
    }

    const renderCategoria = (categoria) => {

        if (categoria.subcategorias.length > 0) {
            return renderAcordionCategorias(categoria);
        }

        return renderComponentCategorias(categoria);
    }

    return (
        <Accordion >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>Categorias</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.menuDetails}>
                {
                    categorias.map(categoria => renderCategoria(categoria))
                }
            </AccordionDetails>
        </Accordion>
    )
}
