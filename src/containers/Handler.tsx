import { CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useCallback } from 'react';
import ErrorSnackbar from '../components/commons/snackbar/ErrorSnackbar';
import SuccessSnackbar from '../components/commons/snackbar/SuccessSnackbar';
import { useGlobalState } from '../store/global/globalState';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        position: 'fixed',
        zIndex: '10000',
        left: '0',
        right: '0',
        top: '0',
        bottom: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
}));

const Handler: React.FC = ({}) => {
    const classes = useStyles();
    const setter = useGlobalState((state) => state.set);
    const isLoading = useGlobalState((state) => state.isLoading);
    const errorMessage = useGlobalState((state) => state.errorMessage);
    const successMessage = useGlobalState((state) => state.successMessage);

    const onHandleCloseSnackbar = useCallback(() => {
        setter({ errorMessage: '', successMessage: '' });
    }, []);

    if (isLoading) {
        return (
            <div className={classes.root}>
                <CircularProgress />
            </div>
        );
    }

    if (successMessage) {
        return (
            <SuccessSnackbar
                open={successMessage ? true : false}
                message={successMessage}
                handleClose={onHandleCloseSnackbar}
            />
        );
    }

    if (errorMessage) {
        return (
            <ErrorSnackbar
                open={errorMessage ? true : false}
                message={errorMessage}
                handleClose={onHandleCloseSnackbar}
            />
        );
    }

    return <></>;
};

export default Handler;
