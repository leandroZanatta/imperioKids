import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, Input, FormHelperText, Paper, TextField, Select, MenuItem } from '@material-ui/core';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const useStyles = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(1.5),
        padding: theme.spacing(3)
    },

    editor: {
        marginTop: theme.spacing(3)
    }
}));



export default function CadastroProduto() {
    const classes = useStyles();
    const [unidade, setUnidade] = React.useState('');

    const [content, setContent] = React.useState('')

    const alterouUnidade = (event) => {
        setUnidade(event.target.value);
    };

    const alterouContent = (model) => {
        setContent(model);
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
