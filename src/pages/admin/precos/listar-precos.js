import React from 'react';
import TabelaPrecos from './components/tabela-precos';

export default function ListarPrecos(props) {

    const { state } = props.location;

    return (
        <div>

            <TabelaPrecos codigoProduto={state.idProduto} />
        </div>
    );
}
