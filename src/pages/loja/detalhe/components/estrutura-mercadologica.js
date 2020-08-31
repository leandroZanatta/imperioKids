import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({

    link: {
        cursor: 'pointer'
    }
}));

export default function EstruturaMercadologica(params) {
    const classes = useStyles();
    const { estrutura } = params;
    const history = useHistory();

    const handleClick = (event, item) => {
        event.preventDefault();

        history.push(`/loja/?categoria=${item.codigoCategoria}`)
    }

    return (
        <Breadcrumbs aria-label="breadcrumb">
            {estrutura.map(item => {
                return (
                    <Link className={classes.link} color="inherit" onClick={(event) => handleClick(event, item)}>
                        {item.descricao}
                    </Link>
                )
            })}
        </Breadcrumbs>
    );
}