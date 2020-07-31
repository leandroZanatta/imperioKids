export const TOKEN_KEY = "@usuario_lar";

export const isAuthenticated = () => {

    let user = localStorage.getItem(TOKEN_KEY);

    return user !== null && JSON.parse(user).idUsuario != null
};

export const getUser = () => {

    let retorno = localStorage.getItem(TOKEN_KEY);

    if (retorno) {
        return JSON.parse(retorno);
    }

    return null;
}

export const getUserId = () => {

    let user = getUser();

    return user ? user.idUsuario : null;
}

export const autenticarUsuario = usuario => {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(usuario));
};
export const logout = () => {

    localStorage.removeItem(TOKEN_KEY);
};

const getMenuUsuario = (codigoPrograma) => {

    const user = getUser();

    if (user) {

        let permissoes = user.permissaoProgramas.filter(permissao => codigoPrograma === permissao.idPrograma);

        if (permissoes.length === 1) {
            return permissoes[0];
        }
    }

    return null;
};

export const isAuthMenuEdit = (codigoPrograma) => {

    const programa = getMenuUsuario(codigoPrograma);

    return programa && programa.flagCadastro;
};

export const isAuthMenuView = (codigoPrograma) => {

    const programa = getMenuUsuario(codigoPrograma);

    return programa && programa.flagLeitura;
};