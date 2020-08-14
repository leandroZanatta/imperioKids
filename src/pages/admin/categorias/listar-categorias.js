import React from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import TabelaCategorias from './components/tabela-categorias';

export default function ListarCategorias() {

    return (
        <div>
            <TabelaCategorias />
        </div>


    );
}
