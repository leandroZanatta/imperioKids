import React from 'react';
import RestTable from '../../../../components/rest-table';

export default function TabelaCategorias() {

    return (
        <div>

            <RestTable data={{
                key: 'idCategoria',
                url: 'categorias',
                columns: [
                    { label: 'Código', name: 'idCategoria' },
                    { label: 'Categoria Pai', name: 'descricaoPai' },
                    { label: 'Descrição', name: 'descricao' }
                ]
            }
            } /></div>
    );
}
