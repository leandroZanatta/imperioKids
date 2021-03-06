import { Snackbar } from '@material-ui/core';
import React from 'react';
import { SharedSnackbarConsumer } from '../providers/snackbar-provider';
import MuiAlert from '@material-ui/lab/Alert';

const SharedSnackbar = () => (
    <SharedSnackbarConsumer>
        {({ snackbarIsOpen, message, type, closeSnackbar }) => (
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={snackbarIsOpen}
                autoHideDuration={3000}
                onClose={closeSnackbar}
            >
                <MuiAlert elevation={6} variant="filled" severity={type}>
                    {message}
                </MuiAlert>
            </Snackbar>
        )}
    </SharedSnackbarConsumer>
);

export default SharedSnackbar;