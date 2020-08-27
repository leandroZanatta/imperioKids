import React, { useContext, useRef } from 'react';
import { useStyles } from '../../../styles/admin/cadastrar-imagens';
import { Paper, Button, Dialog, DialogContent, DialogActions } from '@material-ui/core';
import TabelaImagens from './components/tabela-imagens';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { SharedSnackbarContext } from '../../../providers/snackbar-provider';
import api from '../../../services/api';
export default function CadastrarImagensProduto(props) {
    const childRef = useRef();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [imagem, setImagem] = React.useState(null);
    const { openSnackbar } = useContext(SharedSnackbarContext);
    const { state } = props.location;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const saveImage = () => {

        if (imagem != null) {
            let reader = new FileReader();

            reader.onloadend = function () {

                api.post('produtos/imagem', {
                    imagem: reader.result.replace(/^data:.+;base64,/, ''),
                    descricao: imagem.name,
                    codigoProduto: state.idProduto
                }).then(() => {

                    handleClose();

                    openSnackbar('Imagem Cadastrada com sucesso', 'success');

                    childRef.current.reload();

                }).catch((error) => {

                    let response = error.response;

                    if (response && response.status === 400) {

                        openSnackbar(response.data.mensagem, 'warning');
                    } else {

                        openSnackbar('Ocorreu um erro não tratado pelo servidor.', 'error');
                    }
                });
            };

            reader.readAsDataURL(imagem);
        } else {

            openSnackbar('Selecione uma imagem para o produto', 'warning');
        }
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <TabelaImagens ref={childRef} codigoProduto={state.idProduto}>
                    <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                        <AddAPhotoIcon color="action" className={classes.buttonAddPhoto} />
                        Cadastrar Imagem
                    </Button>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogContent>
                            <input
                                accept="image/*"
                                onChange={(image) => setImagem(image.target.files[0])}
                                type="file"
                                id="icon-button-file"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancelar
                            </Button>
                            <Button onClick={saveImage} color="primary">
                                Salvar
                            </Button>
                        </DialogActions>
                    </Dialog>
                </TabelaImagens>
            </Paper>
        </div>
    );
}
