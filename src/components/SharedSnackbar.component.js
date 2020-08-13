import { IconButton, Snackbar } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React from 'react';
import { SharedSnackbarConsumer } from '../providers/snackbar-provider';
import MuiAlert from '@material-ui/lab/Alert';

const SharedSnackbar = () => (
    <SharedSnackbarConsumer>
        {({ snackbarIsOpen, message, closeSnackbar }) => (
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={snackbarIsOpen}
                autoHideDuration={3000}
                onClose={closeSnackbar}
            >
                <MuiAlert elevation={6} variant="filled" severity='warning'>
                    {message}
                </MuiAlert>
            </Snackbar>
        )}
    </SharedSnackbarConsumer>
);

export default SharedSnackbar;