import React from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import TabelaCategorias from './components/tabela-categorias';

export default function ListarCategorias() {


    const history = useHistory();

    const abrircadastro = () => {

        history.push('/admin/cadastro-categorias')
    }

    return (
        <div>
            <Button variant="contained" color="primary" onClick={abrircadastro}>
                Adicionar
            </Button>
            <TabelaCategorias />
        </div>


    );
}
