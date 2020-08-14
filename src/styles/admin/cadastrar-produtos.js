import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(1.5),
        padding: theme.spacing(3)
    },

    editor: {
        marginTop: theme.spacing(3)
    }
}));