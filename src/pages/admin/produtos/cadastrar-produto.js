import React from 'react';
import { FormControl, InputLabel, Paper, TextField, Select, MenuItem, FormControlLabel, Switch } from '@material-ui/core';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import NumberFormat from 'react-number-format';
import { useStyles } from '../../../styles/admin/cadastrar-produtos';


export default function CadastroProduto() {
    const classes = useStyles();
    const [unidade, setUnidade] = React.useState('');
    const [estoqueMinimo, setEstoqueMinimo] = React.useState('');
    const [controlaEstoque, setcontrolaEstoque] = React.useState(true);
    const [content, setContent] = React.useState('')

    const alterouUnidade = (event) => {
        setUnidade(event.target.value);
    };

    const alterouContent = (model) => {
        setContent(model);
    };

    const alterouEstoque = (event) => {
        setcontrolaEstoque(event.target.checked);
    };

    const alterouEstoqueMinimo = (event) => {
        setEstoqueMinimo(event.floatValue);
    };

    return (
        <Paper className={classes.root}>
            <form noValidate autoComplete="off">
                <TextField id="standard-basic" fullWidth label="Descrição" />
                <FormControl fullWidth className={classes.formControl}>
                    <InputLabel id="lb-unidade">Unidade de Medida</InputLabel>
                    <Select
                        labelId="lb-unidade"
                        id="demo-simple-select"
                        value={unidade}
                        onChange={alterouUnidade}
                        displayEmpty
                    >
                        <MenuItem value={1}>Kg</MenuItem>
                        <MenuItem value={2}>Un</MenuItem>
                        <MenuItem value={3}>Pc</MenuItem>
                    </Select>
                </FormControl>
                <FormControlLabel className={classes.formControl}
                    control={
                        <Switch
                            color="primary"
                            checked={controlaEstoque}
                            onChange={alterouEstoque}
                            name="controlaEstoque" />
                    }
                    label="Controla Estoque"
                />
                <NumberFormat
                    value={estoqueMinimo}
                    thousandSeparator={true}
                    customInput={TextField}
                    onValueChange={alterouEstoqueMinimo}
                    prefix={'R$'}
                    disabled={!controlaEstoque} />
                <TextField id="standard-basic" label="Estoque Máximo" disabled={!controlaEstoque} />
                <InputLabel id="editor" className={classes.editor}>
                    Breve descrição sobre o Produto
                </InputLabel>

                <Editor
                    wrapperStyle={{ marginTop: 10 }}
                    editorStyle={{ minHeight: 200 }}
                    editorState={content}
                    onEditorStateChange={alterouContent}
                />
            </form>
        </Paper>
    );
}
