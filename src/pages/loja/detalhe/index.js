import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import EstruturaMercadologica from './components/estrutura-mercadologica';
import GaleriaProduto from './components/galeria-produto';
import { Grid, Paper } from '@material-ui/core';
import api from '../../../services/api';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2)
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function DetalheProduto() {
    const classes = useStyles();
    const { idProduto } = useParams();
    const [detalhes, setDetalhes] = React.useState({ imagens: [], estruturaProduto: [] });

    const pesquisar = () => {

        api.get(`/produtos/detalhes/${idProduto}`).then(response => {
            setDetalhes(response.data);
        }).catch(function (error) {

        });
    }

    React.useEffect(pesquisar, []);
    return (

        <Grid container className={classes.root} >
            <EstruturaMercadologica estrutura={detalhes.estruturaProduto} />
            <Grid container justify="center" spacing={1}>

                <Grid item xs={3}>
                    <Paper className={classes.paper}>xs=12</Paper>
                </Grid>
                <Grid item xs={6}>

                    <GaleriaProduto images={detalhes.imagens} />
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>xs=12</Paper>
                </Grid>

            </Grid>

        </Grid>

    );
}