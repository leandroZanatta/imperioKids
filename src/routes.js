import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import DashBoard from './pages/admin/main';
import Login from "./pages/admin/login";
import Home from './pages/admin/main/home'
import { isAuthenticated } from "./services/auth";
import ListarProdutos from "./pages/admin/produtos/listar-produtos";
import CadastroProduto from "./pages/admin/produtos/cadastrar-produto";

const routes = [
    {
        path: "/admin/login",
        component: Login
    },
    {
        path: "/admin",
        component: DashBoard,
        auth: true,
        routes: [
            {
                path: "/admin/home",
                title: 'Home',
                component: Home
            }, {
                path: "/admin/produtos",
                title: 'Produtos',
                component: ListarProdutos
            }, {
                path: "/admin/cadastro-produtos",
                title: 'Cadastro de Produto',
                component: CadastroProduto
            }
        ]
    }
];

export default function RouteConfigExample() {
    return (
        <Router>
            <div>
                <Switch>
                    {routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))}
                </Switch>
            </div>
        </Router>
    );
}

function RouteWithSubRoutes(route) {
    return (
        <Route
            path={route.path}
            render={props => {

                if (route.auth && !isAuthenticated()) {
                    return <Redirect to='/admin/login' />
                }

                return <route.component {...props} routes={route.routes} />
            }}
        />
    );
}

