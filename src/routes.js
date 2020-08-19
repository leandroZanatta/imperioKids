import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./services/auth";
import DashBoard from './pages/admin/main';
import Login from "./pages/admin/login";
import { adminMenu } from "./admin-menu";
import { SharedSnackbarProvider } from "./providers/snackbar-provider";
import Loja from "./pages/loja/main";

const routes = [
    {
        exact: true,
        path: "/",
        component: Loja
    }, {
        path: "/admin/login",
        component: Login
    },
    {
        path: "/admin",
        component: DashBoard,
        auth: true,
        routes: adminMenu
    }
];

export default function RouteConfigExample() {
    return (
        <SharedSnackbarProvider>
            <Router>
                <div>
                    <Switch>
                        {routes.map((route, i) => (
                            <RouteWithSubRoutes key={i} {...route} />
                        ))}
                    </Switch>
                </div>
            </Router>
        </SharedSnackbarProvider>
    );
}

function RouteWithSubRoutes(route) {
    return (
        <Route
            path={route.path}
            exact={route.exact}
            render={props => {

                if (route.auth && !isAuthenticated()) {
                    return <Redirect to='/admin/login' />
                }

                return <route.component {...props} routes={route.routes} />
            }}
        />
    );
}

