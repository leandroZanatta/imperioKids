import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import EstruturaMercadologica from './components/estrutura-mercadologica';
import GaleriaProduto from './components/galeria-produto';
import { Grid, Paper, Typography, Container, Button } from '@material-ui/core';
import api from '../../../services/api';
import { parseValue } from '../../../utils/money-format';


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
    conteudoDescricao: {
        textAlign: 'left',
    }
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

    const renderPreco = (detalhes) => {

        return 'R$ ' + parseValue(parseFloat(detalhes.precoBase));
    }

    React.useEffect(pesquisar, []);

    debugger
    return (

        <Grid container className={classes.root} >
            <EstruturaMercadologica estrutura={detalhes.estruturaProduto} />
            <Grid container justify="center" spacing={1}>


                <Grid item xs={7}>
                    <GaleriaProduto images={detalhes.imagens} />
                </Grid>
                <Grid item xs={5}>
                    <Container className={classes.paper}>

                        <Typography variant="h6" component="h6">
                            {detalhes.nome}
                        </Typography>

                        <Typography variant="h6" component="h6">
                            {renderPreco(detalhes)}
                        </Typography>

                        <Button variant="outlined" color="primary" fullWidth>Adicionar ao carrinho</Button>
                        <Container>

                            <div className={classes.conteudoDescricao} dangerouslySetInnerHTML={{ __html: detalhes.descricao }} />,
                        </Container>
                    </Container>
                </Grid>


            </Grid>

        </Grid>

    );
}