import React from 'react';
import { TextField } from '@material-ui/core';
import { parseValue, replaceNaoNumerico } from '../utils/money-format';



export default function MoneyInput(props) {

    const { name, value, label, disabled, fullWidth, autoFocus, onChange } = props;

    const [price, setPrice] = React.useState(parseValue(parseFloat(value)));

    const alterarValor = (valor) => {

        let valorstr = parseValue(valor);

        setPrice(valorstr);

        let valorDecimal = parseFloat(valorstr.replace(/[.]+/g, '').replace(',', '.'));

        onChange(valorDecimal, valorstr);
    }

    const onKeyDown = (evt) => {

        if (evt.keyCode === 8) {

            let valor = '0' + replaceNaoNumerico(evt.target.value);

            alterarValor(valor.substr(0, valor.length - 1));

            return
        }

        let valor = replaceNaoNumerico(evt.target.value) + replaceNaoNumerico(evt.key);

        alterarValor(valor);
    }

    return (
        <TextField
            fullWidth={fullWidth}
            name={name}
            autoFocus
            value={price}
            label={label}
            disabled={disabled}
            onKeyDown={onKeyDown}
        />
    );
}