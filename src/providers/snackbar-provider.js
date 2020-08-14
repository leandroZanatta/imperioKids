import React from 'react';
import SharedSnackbar from '../components/SharedSnackbar.component';


export const SharedSnackbarContext = React.createContext();


export function SharedSnackbarProvider(props) {

    const [snackbarIsOpen, setSnackbarIsOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [type, setType] = React.useState('success');
    const { children } = props;

    const openSnackbar = (message, type) => {

        setMessage(message);
        setType(type);

        setSnackbarIsOpen(true);
    };

    const closeSnackbar = () => {

        setSnackbarIsOpen(false);

        setTimeout(() => {
            setMessage('');
            setType('success');
        }, 200)
    };


    return (

        <SharedSnackbarContext.Provider
            value={{ openSnackbar, closeSnackbar, snackbarIsOpen, message, type }}
        >
            <SharedSnackbar />
            {children}
        </SharedSnackbarContext.Provider>
    )
}

export const SharedSnackbarConsumer = SharedSnackbarContext.Consumer;