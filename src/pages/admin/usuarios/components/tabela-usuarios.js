import React from 'react';
import RestTable from '../../../../components/rest-table';


export default function TabelaUsuarios() {


    return (
        <RestTable data={{
            key: 'codigo',
            url: 'usuarios',
            columns: [
                { label: 'Código', name: 'codigo' },
                { label: 'Descrição', name: 'descricao' }
            ]
        }
        } />
    );
}
