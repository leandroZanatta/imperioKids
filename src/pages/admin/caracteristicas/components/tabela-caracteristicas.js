import React from 'react';
import RestTable from '../../../../components/rest-table';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';


export default function TabelaCaracteristicas() {

    const history=useHistory();

    const abrircadastro = () => { 

        history.push('/admin/cadastro-caracteristicas')
    }

    return (
        <div>
            <Button variant="contained" color="primary" onClick={abrircadastro}>
                Adicionar
            </Button>
            <RestTable data={{
                key: 'idCaracteristica',
                url: 'caracteristicas',
                columns: [
                    { label: 'Código', name: 'idCaracteristica' },
                    { label: 'Descrição', name: 'descricao' }
                ]
            }
            } /></div>
    );
}
