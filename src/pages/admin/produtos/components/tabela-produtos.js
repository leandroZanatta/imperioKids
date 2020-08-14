import React from 'react';
import RestTable from '../../../../components/rest-table';


export default function TabelaProdutos() {

    return (
        <div>
            <RestTable data={{
                key: 'idProduto',
                url: 'produtos',
                columns: [
                    { label: 'Código', name: 'idProduto' },
                    { label: 'Descrição', name: 'descricao' }
                ]
            }
            } /></div>
    );
}
