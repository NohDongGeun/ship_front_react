import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

interface SuccessSnackbarProps {
    open: boolean;
    message: string;
    handleClose: () => void;
}

const SuccessSnackbar: React.FC<SuccessSnackbarProps> = ({
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
                severity="success"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default SuccessSnackbar;
