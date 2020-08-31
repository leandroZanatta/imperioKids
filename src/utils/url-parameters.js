
export const adicionarParametroURL = (url, name, value) => {

    const query = new URLSearchParams(url);

    query.set(name, value);

    return '?' + query.toString();
}