import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import home from "./pages/admin/main/home";
import ListarCaracteristicas from "./pages/admin/caracteristicas/listar-caracteriticas";
import ListarCategorias from "./pages/admin/categorias/listar-categorias";
import CadastrarCaracteristicas from "./pages/admin/caracteristicas/cadastrar-caracteristicas";
import CadastrarCategorias from "./pages/admin/categorias/cadastrar-categorias";
import ListarProdutos from "./pages/admin/produtos/listar-produtos";
import CadastroProduto from "./pages/admin/produtos/cadastrar-produto";
import ListarUsuarios from "./pages/admin/usuarios/listar-usuarios";
import CadastrarImagensProduto from './pages/admin/produtos/cadastrar-imagens';
import ListarPrecos from './pages/admin/precos/listar-precos';
import CadastroPrecos from './pages/admin/precos/cadastrar-precos';

export const adminMenu = [
    {
        id: 1,
        path: "/admin/home",
        title: 'Home',
        visible: true,
        icon: <DashboardIcon />,
        component: home
    },
    {
        id: 1,
        path: "/admin/caracteristicas",
        title: "Caracteristicas",
        visible: true,
        icon: <DashboardIcon />,
        component: ListarCaracteristicas
    }, {
        id: 1,
        path: "/admin/categorias",
        title: "Categorias",
        visible: true,
        icon: <DashboardIcon />,
        component: ListarCategorias
    },
    {
        id: 1,
        path: "/admin/cadastro-caracteristicas",
        title: "Cadastrar",
        visible: false,
        component: CadastrarCaracteristicas
    }, {
        id: 1,
        path: "/admin/cadastro-categorias",
        title: "Cadastrar",
        visible: false,
        component: CadastrarCategorias
    }, {
        id: 1,
        path: "/admin/produtos",
        title: 'Produtos',
        visible: true,
        icon: <DashboardIcon />,
        component: ListarProdutos
    }, {
        id: 1,
        path: "/admin/cadastro-produtos",
        title: 'Cadastro de Produto',
        visible: false,
        component: CadastroProduto
    }, {
        id: 1,
        path: "/admin/cadastro-produtos-imagem",
        title: 'Cadastro de Imagens',
        visible: false,
        component: CadastrarImagensProduto
    }, {
        id: 1,
        path: "/admin/listar-precos",
        title: 'Listar Precos',
        visible: false,
        component: ListarPrecos
    }, {
        id: 1,
        path: "/admin/cadastro-precos",
        title: 'Cadastro de Precos',
        visible: false,
        component: CadastroPrecos
    }, {
        id: 1,
        path: "/admin/usuarios",
        title: 'Usuários',
        visible: true,
        icon: <DashboardIcon />,
        component: ListarUsuarios
    }
];