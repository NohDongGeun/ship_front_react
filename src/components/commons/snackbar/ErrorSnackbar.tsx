import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

interface ErrorSnackbarProps {
    open: boolean;
    message: string;
    handleClose: () => void;
}

const ErrorSnackbar: React.FC<ErrorSnackbarProps> = ({
    open,
    message,
    handleClose,
}) => {
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}
            message={message}
        >
            <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default ErrorSnackbar;
