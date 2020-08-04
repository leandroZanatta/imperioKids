import React from 'react';
import clsx from 'clsx';
import logoutImg from '../../../assets/logout.png';
import pacientesImg from '../../../assets/pacientes.png';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { Drawer, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { logout } from '../../../services/auth';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Link } from 'react-router-dom';
import { isAuthMenuView } from '../../../services/auth';

const drawerWidth = 240;

const useStyles = theme => ({
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
    },
});

class ToolbarMain extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: true
        }
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {

        this.setState({ open: false });
    };

    render() {

        const { classes } = this.props;
        const { open } = this.state;
        const { history } = this.props;
        const { title } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
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
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>

                    <Divider />
                    <List>
                        <div>
                            {isAuthMenuView(1) &&
                                <Link to="/admin/home">
                                    <ListItem button>
                                        <ListItemIcon>
                                            <DashboardIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Home" >
                                        </ListItemText>
                                    </ListItem>
                                </Link>
                            }
                            {isAuthMenuView(1) &&
                                <Link to="/admin/usuarios">
                                    <ListItem button>
                                        <ListItemIcon>
                                            <DashboardIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Usuários" >
                                        </ListItemText>
                                    </ListItem>
                                </Link>
                            }
                            {isAuthMenuView(2) &&
                                <Link to="/admin/produtos">
                                    <ListItem button>
                                        <ListItemIcon>
                                            <img src={pacientesImg} width={25} height={25} alt="Pacientes" />
                                        </ListItemIcon>
                                        <ListItemText primary="Produtos" >
                                        </ListItemText>
                                    </ListItem>
                                </Link>
                            }
                        </div>
                    </List>
                </Drawer>
            </div >
        );
    }
}

export default withStyles(useStyles)(ToolbarMain)