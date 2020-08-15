import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(1.5),
        padding: theme.spacing(3)
    },

    formControl: {
        marginTop: theme.spacing(1)
    },

    editor: {
        marginTop: theme.spacing(3)
    },
    container: {
        padding: theme.spacing(5, 3, 0, 3)
    },
    containerAcao: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: theme.spacing(3, 0)
    }
}));