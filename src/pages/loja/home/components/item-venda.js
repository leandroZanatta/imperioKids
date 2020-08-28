import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    cardPricing: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: 1,
        height: 350,
        borderStyle: 'solid',
        borderColor: '#CCC',
        marginBottom: theme.spacing(2),
        cursor: 'pointer'
    },
}));


export default function ItemVenda(props) {

    const { row } = props;
    const classes = useStyles();
    const history = useHistory();

    const exibirDetalheProduto = () => {

        history.push(`/loja/detalhe-produto/${row.idProduto}`)
    }

    return (
        <Grid item xs={6} sm={4} md={3}>

            <div className={classes.cardPricing} onClick={exibirDetalheProduto}>
                <img src={row.imageUrl} height={250} alt="" />
                <Typography color="textSecondary">
                    {row.descricao}
                </Typography>
                <Typography color="textPrimary">
                    <NumberFormat
                        value={row.precoBase}
                        prefix={'$'}
                        thousandSeparator={'.'}
                        decimalSeparator={','}
                        fixedDecimalScale
                        decimalScale={2}
                        displayType={'text'}
                    />
                </Typography>
            </div>

        </Grid>
    );
}
