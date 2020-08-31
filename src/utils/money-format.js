
const adicionarSeparadorMilhar = (valorInteiro) => {

    let arrayInverso = valorInteiro.toString().split('').reverse();

    for (let i = 3; i < arrayInverso.length; i += 4) {
        arrayInverso.splice(i, 0, '.');
    }

    return arrayInverso.reverse().join('');
}

const getStringValue = (valor) => {

    if (typeof valor === 'string') {

        return valor;
    }

    return valor.toFixed(2).toString();
}


export const parseValue = (valor) => {

    let valorStr = replaceNaoNumerico(getStringValue(valor));

    while (valorStr.length < 3) {
        valorStr += '0';
    }

    let inteiros = parseInt(valorStr.substr(0, valorStr.length - 2));

    let decimais = valorStr.substr(valorStr.length - 2, valorStr.length)

    return (adicionarSeparadorMilhar(inteiros) + ',' + decimais)
}


export const replaceNaoNumerico = (value) => {

    if (typeof value === 'number') {
        return value.toString().replace(/[^0-9]+/g, '');
    }

    return value.replace(/[^0-9]+/g, '');
}