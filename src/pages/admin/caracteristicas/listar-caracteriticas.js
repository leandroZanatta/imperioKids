import React from 'react';
import TabelaCaracteristicas from './components/tabela-caracteristicas';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

export default function ListarCaracteristicas() {


    const history = useHistory();

    const abrircadastro = () => {

        history.push('/admin/cadastro-caracteristicas')
    }

    return (
        <div>
            <Button variant="contained" color="primary" onClick={abrircadastro}>
                Adicionar
            </Button>
            <TabelaCaracteristicas />
        </div>


    );
}
