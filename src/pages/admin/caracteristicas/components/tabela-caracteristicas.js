import React from 'react';
import RestTable from '../../../../components/rest-table';
import { TextField, IconButton } from '@material-ui/core';

export default function TabelaCaracteristicas() {

    return (
        <div>

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
