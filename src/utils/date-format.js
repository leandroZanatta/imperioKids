
export const parseDate = (data) => {

    if (typeof data === 'object') {

        return data.toISOString().substr(0, 11) + data.toLocaleTimeString().substring(0, 5)
    }

    let dataStr = data.toString();

    return dataStr.substr(6, 4) + '-' + dataStr.substr(3, 2) + '-' + dataStr.substr(0, 2) + 'T' + dataStr.substr(11, 5);
}

export const setHours = (data, hours, minutes) => {

    if (typeof data === 'object') {

        return data.toISOString().substr(0, 11) + hours + ':' + minutes;
    }

    let dataStr = data.toString();

    return dataStr.substr(6, 4) + '-' + dataStr.substr(3, 2) + '-' + dataStr.substr(0, 2) + 'T' + hours + ':' + minutes;
}
