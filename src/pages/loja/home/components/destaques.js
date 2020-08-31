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



export default function Destaques(props) {

    const classes = useStyles();
    const history = useHistory();
    const { destaqueSelecionado } = props;
    const url = useLocation().search;

    const isDestaqueSelecionado = (destaque) => {

        return destaqueSelecionado && parseInt(destaqueSelecionado) === destaque;
    }
    return (
        <Accordion >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>Destaques</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.menuDetails}>

                <Paper className={classes.cardCategoria}>
                    <Checkbox
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        checked={isDestaqueSelecionado(1)}
                        onClick={(event) => {
                            event.stopPropagation();

                            history.push(`/loja/${adicionarParametroURL(url, 'destaque', '1')}`)
                        }}
                    />
                    <Typography className={classes.descricaoCategoria}>Ofertas</Typography>

                </Paper>
                <Paper className={classes.cardCategoria}>
                    <Checkbox
                        color="primary"
                        checked={isDestaqueSelecionado(2)}
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        onClick={(event) => {
                            event.stopPropagation();

                            history.push(`/loja/${adicionarParametroURL(url, 'destaque', '2')}`)
                        }}
                    />
                    <Typography className={classes.descricaoCategoria}>Destaques</Typography>

                </Paper>
            </AccordionDetails>
        </Accordion>
    )
}
