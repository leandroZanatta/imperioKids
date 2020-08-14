import React from 'react';
import ToolbarMain from './ToolbarMain';
import { Switch, Route } from 'react-router-dom';
import { Grid, makeStyles } from '@material-ui/core';
import Copyright from '../../../components/Copyright';
import { isAuthMenuView } from '../../../services/auth';
import { SharedSnackbarProvider } from '../../../providers/snackbar-provider';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minHeight: '100vh',
    },

    content: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1
    },

    container: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(4),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        flex: 1
    },

    appBarSpacer: theme.mixins.toolbar,

    paper: {
        padding: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        flex: 1,
    },

    footer: {
        padding: theme.spacing(2),
        marginTop: 'auto',
        backgroundColor:
            theme.palette.type === 'dark' ? theme.palette.grey[800] : theme.palette.grey[300],
    }
}));


export default function Dashboard(props) {

    const classes = useStyles();
    const { routes, history } = props;

    const getTitle = () => {

        var rota = routes.find((route) => route.path === history.location.pathname);

        if (rota) {

            return rota.title;
        }
        return '';
    }

    const RouteWithSubRoutes = (route) => {

        return (
            <Route
                path={route.path}
                render={props => (<route.component {...props} routes={route.routes} />)}
            />
        );
    }

    return (

        <div className={classes.root}>
            <ToolbarMain history={props.history} title={getTitle()} />

            <div className={classes.content}>
                <div className={classes.appBarSpacer} />
                <div className={classes.container}>

                    <Grid item xs={12}>

                        <Switch>
                            {routes.filter(route => route.codigoPrograma == null || isAuthMenuView(route.codigoPrograma)).map((route, i) => (
                                <RouteWithSubRoutes key={i} {...route} />
                            ))}
                        </Switch>

                    </Grid>
                </div>
                <footer className={classes.footer}>
                    <Copyright />
                </footer>
            </div>
        </div >
    );
}