import React, { useContext } from 'react';
import { FormControl, InputLabel, Paper, TextField, Select, MenuItem, FormControlLabel, Switch, Container, Button } from '@material-ui/core';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useStyles } from '../../../styles/admin/cadastrar-produtos';
import Pesquisa from '../../../components/pesquisa';
import { useHistory } from 'react-router-dom';
import { SharedSnackbarContext } from '../../../providers/snackbar-provider';
import api from '../../../services/api';


export default function CadastroProduto(props) {

    const classes = useStyles();
    const history = useHistory();

    const dataEmpty = {
        idProduto: '',
        descricao: '',
        descricaoConteudo: '',
        codigoCategoria: '',
        codigoUnidade: null,
        controlaEstoque: true,
        produtoOferta: false,
        produtoDestaque: false
    };
    const { state } = props.location;
    const [data, setData] = React.useState(Object.assign(dataEmpty, state));

    const { openSnackbar } = useContext(SharedSnackbarContext);
    const handleChange = (name, value) => {
        setData({ ...data, [name]: value });
    }

    const goBack = () => {

        history.push('/admin/produtos');
    }

    const handleSubmit = (event) => {

        api.post('produtos', data)
            .then(() => {

                openSnackbar('Produto cadastrado com sucesso', 'success');

                goBack();
            })
            .catch((error) => {

                let response = error.response;

                if (response && response.status === 400) {

                    openSnackbar(response.data.mensagem, 'warning');
                } else {

                    openSnackbar('Ocorreu um erro não tratado pelo servidor.', 'error');
                }
            });
    }

    return (
        <Paper className={classes.root}>
            <form noValidate autoComplete="off">
                <TextField
                    name='idProduto'
                    value={data.idProduto}
                    label="Código"
                    disabled={true}
                />
                <TextField
                    value={data.descricao}
                    onChange={event => handleChange('descricao', event.target.value)}
                    fullWidth
                    label="Descrição"
                />
                <Pesquisa
                    codigoPesquisa={1}
                    rowsPerPage={20}
                    onValueChange={item => handleChange('codigoCategoria', item != null ? item.idCategoria : null)}
                    formatValue={(item) => item.idCategoria + ' - ' + item.descricao}
                    data={{
                        numerolinhas: 20,
                        key: 'idCategoria',
                        url: 'categorias',
                        columns: [
                            { label: 'Código', name: 'idCategoria' },
                            { label: 'Descrição', name: 'descricao' }
                        ]
                    }}
                    titulo="Categoria"
                />
                <FormControl fullWidth className={classes.formControl}>
                    <InputLabel id="lb-unidade">Unidade de Medida</InputLabel>
                    <Select
                        labelId="lb-unidade"
                        value={data.codigoUnidade}
                        onChange={event => handleChange('codigoUnidade', event.target.value)}
                        displayEmpty
                    >
                        <MenuItem value={1}>Kg</MenuItem>
                        <MenuItem value={2}>Un</MenuItem>
                        <MenuItem value={3}>Pc</MenuItem>
                    </Select>
                </FormControl>
                <FormControlLabel
                    className={classes.formControl}
                    control={
                        <Switch
                            color="primary"
                            checked={data.controlaEstoque}
                            onChange={event => handleChange('controlaEstoque', event.target.checked)}
                            name="controlaEstoque"
                        />
                    }
                    label="Controla Estoque"
                />
                <FormControlLabel
                    className={classes.formControl}
                    control={
                        <Switch
                            color="primary"
                            checked={data.produtoOferta}
                            onChange={event => handleChange('produtoOferta', event.target.checked)}
                            name="produtoOferta"
                        />
                    }
                    label="Produto em Oferta"
                />

                <FormControlLabel
                    className={classes.formControl}
                    control={
                        <Switch
                            color="primary"
                            checked={data.produtoDestaque}
                            onChange={event => handleChange('produtoDestaque', event.target.checked)}
                            name="produtoDestaque"
                        />
                    }
                    label="Produto em Destaque"
                />
                <InputLabel className={classes.editor}>Breve descrição sobre o Produto</InputLabel>
                <ReactQuill theme="snow" value={data.descricaoConteudo} onChange={content => handleChange('descricaoConteudo', content)} />
                <Container className={classes.containerAcao}>
                    <Button
                        onClick={handleSubmit}
                        variant='contained'
                        color='primary'>
                        Salvar
                    </Button>
                    <Button
                        onClick={goBack}
                        style={{ marginLeft: 5 }}
                        variant='contained'
                        color='secondary'>
                        Cancelar
                    </Button>
                </Container>
            </form>
        </Paper>
    );
}
