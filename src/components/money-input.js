import React from 'react';
import { TextField } from '@material-ui/core';


const adicionarSeparadorMilhar = (valorInteiro) => {

    let arrayInverso = valorInteiro.toString().split('').reverse();

    for (let i = 3; i < arrayInverso.length; i += 4) {
        arrayInverso.splice(i, 0, '.');
    }

    return arrayInverso.reverse().join('');
}

const parseValue = (valor) => {

    let valorStr = valor.toString();

    while (valorStr.length < 3) {
        valorStr += '0';
    }

    let inteiros = parseInt(valorStr.substr(0, valorStr.length - 2));

    let decimais = valorStr.substr(valorStr.length - 2, valorStr.length)

    return (adicionarSeparadorMilhar(inteiros) + ',' + decimais)
}


const replaceNaoNumerico = (value) => {

    if (typeof value === 'number') {
        return value.toString().replace(/[^0-9]+/g, '');
    }

    return value.replace(/[^0-9]+/g, '');
}

export default function MoneyInput(props) {

    const { name, value, label, disabled, fullWidth, onChange } = props;

    const [price, setPrice] = React.useState(parseValue(replaceNaoNumerico(value)));

    const alterarValor = (valor) => {

        let valorstr = parseValue(valor);
        let valorDecimal = parseFloat(valorstr.replace(/[.]+/g, '').replace(',', '.'));

        setPrice(valorstr);

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
            value={price}
            label={label}
            disabled={disabled}
            onKeyDown={onKeyDown}
        />
    );
}