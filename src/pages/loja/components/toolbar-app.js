import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, AppBar, Toolbar } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import MenuAutenticacao from './menu-autenticacao';


const useStyles = makeStyles((theme) => ({

    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap'
    },
    toolbarTitle: {
        flexGrow: 1,
        cursor: 'pointer',
    },

    link: {
        margin: theme.spacing(1, 1.5),
    },
}));


export default function ToolbarApp() {

    const classes = useStyles();
    const history = useHistory();

    const goToHome = () => {

        history.push('/');
    }

    return (
        <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <Typography onClick={goToHome} variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                    Império Kids
                </Typography>
                <nav>
                    <Link to={'/login'} variant="button" color="textPrimary" href="#" className={classes.link}>
                        Sobre Nós
                    </Link>
                </nav>
                <MenuAutenticacao />
            </Toolbar>
        </AppBar>
    );
}
