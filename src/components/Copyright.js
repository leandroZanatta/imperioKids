import React from "react";
import { Typography } from "@material-ui/core";

export default class Copyright extends React.Component {

    render() {

        return (
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                    Império Kids
           {' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }
}