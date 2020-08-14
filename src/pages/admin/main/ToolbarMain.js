import React from 'react';
import clsx from 'clsx';
import logoutImg from '../../../assets/logout.png';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Typography, IconButton, Toolbar, CssBaseline, Drawer, Divider } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import List from '@material-ui/core/List';
import { logout } from '../../../services/auth';
import { isAuthMenuView } from '../../../services/auth';
import { adminMenu } from '../../../admin-menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from './componets/menu-item';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },

    toolbar: {
        paddingRight: 24,
    },

    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },

    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    menuButton: {
        marginRight: 36,
    },

    menuButtonHidden: {
        display: 'none',
    },

    title: {
        flexGrow: 1,
    },

    user: {
        flexGrow: 1,
        fontSize: 12
    },

    fixedHeight: {
        height: 240,
    }
}));

export default function ToolbarMain(props) {

    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const { history, title } = props;

    const handleDrawerOpen = () => { setOpen(true) };
    const handleDrawerClose = () => { setOpen(false) };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        {title}
                    </Typography>
                    <IconButton color="inherit" onClick={() => {
                        logout();
                        history.push('login');
                    }
                    }>
                        <img src={logoutImg} width={25} height={25} alt="Sair" />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{ paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose) }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>

                <Divider />
                <List>
                    <div>
                        {adminMenu.filter(item => item.visible && isAuthMenuView(item.id))
                            .map((menu, key) => <MenuItem key={key} menu={menu} />)}
                    </div>
                </List>
            </Drawer>
        </div >
    );

}