import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

export default function MenuItem(props) {

    const { menu } = props;

    return (
        <Link to={menu.path}>
            <ListItem button>
                <ListItemIcon>
                    {menu.icon}
                </ListItemIcon>
                <ListItemText primary={menu.title} >
                </ListItemText>
            </ListItem>
        </Link>
    )
}