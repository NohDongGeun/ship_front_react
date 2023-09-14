import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Checkbox,
    Button,
    Box,
} from '@mui/material';
import CheckBoxComponent from '../CheckBox';

interface IModalComponent {
    title: string;
    open: boolean;
    children: React.ReactNode;
    onClose?: () => void;
    onHandleConfirm?: () => void;
}

const ModalComponent: React.FC<IModalComponent> = ({
    title,
    open,
    onClose,
    children,
    onHandleConfirm,
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth={'xl'}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <DialogTitle sx={{ textAlign: 'center' }}>{title}</DialogTitle>
            <DialogContent sx={{ width: '400px', height: '300px' }}>
                {children}
            </DialogContent>
            <DialogActions>
                {onHandleConfirm && onClose && (
                    <>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={onHandleConfirm} color="primary">
                            Confirm
                        </Button>
                    </>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default ModalComponent;
