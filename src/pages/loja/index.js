import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from '../../components/Copyright';
import ToolbarApp from './components/toolbar-app';
import { Switch, Route } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
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

const RouteWithSubRoutes = (route) => {

    return (
        <Route
            path={route.path}
            render={props => (<route.component {...props} routes={route.routes} />)}
        />
    );
}

export default function Loja(props) {
    const classes = useStyles();

    const { routes } = props;



    return (
        <React.Fragment>
            <CssBaseline />
            <ToolbarApp />

            <Grid item xs={12}>

                <Switch>
                    {routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))}
                </Switch>

            </Grid>
            <Container maxWidth="md" component="footer" className={classes.footer}>
                <Copyright />
            </Container>

        </React.Fragment>
    );
}