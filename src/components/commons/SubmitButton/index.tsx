import { Button } from '@mui/material';
import React from 'react';

interface ISubmitButton {
    color?:
        | 'error'
        | 'inherit'
        | 'primary'
        | 'secondary'
        | 'success'
        | 'info'
        | 'warning'
        | undefined;
    label?: string;
    onSubmit: React.MouseEventHandler<HTMLButtonElement>;
}

const SubmitButton: React.FC<ISubmitButton> = ({
    color = 'primary',
    label = 'save',
    onSubmit,
}) => {
    return (
        <Button
            sx={{ marginLeft: '10px' }}
            color={color}
            variant="contained"
            onClick={onSubmit}
        >
            {label}
        </Button>
    );
};

export default SubmitButton;
