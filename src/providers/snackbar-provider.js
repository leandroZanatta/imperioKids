import React, { Component } from 'react';
import SharedSnackbar from '../components/SharedSnackbar.component';


export const SharedSnackbarContext = React.createContext();

export class SharedSnackbarProvider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            message: '',
            type: 'success'
        };
    }

    openSnackbar = (message, type) => {
        this.setState({
            message,
            type,
            isOpen: true,
        });
    };

    closeSnackbar = () => {

        this.setState({
            isOpen: false,
            message: '',
            type: 'success'
        });
    };

    render() {
        const { children } = this.props;

        return (
            <SharedSnackbarContext.Provider
                value={{
                    openSnackbar: this.openSnackbar,
                    closeSnackbar: this.closeSnackbar,
                    snackbarIsOpen: this.state.isOpen,
                    message: this.state.message,
                    type: this.state.type
                }}
            >
                <SharedSnackbar />
                {children}
            </SharedSnackbarContext.Provider>
        );
    }
}

export const SharedSnackbarConsumer = SharedSnackbarContext.Consumer;