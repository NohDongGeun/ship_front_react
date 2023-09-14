import { Box, Checkbox } from '@mui/material';
import React from 'react';

interface ICheckBoxComponent {
    htmlFor: string;
    label: string;
    isChecked: boolean;
    value: string;
    categoryId: number;
    onHandleCheckbox: (
        e: React.ChangeEvent<HTMLInputElement>,
        categoryId: number,
        isChecked: boolean
    ) => void;
}

const CheckBoxComponent: React.FC<ICheckBoxComponent> = ({
    htmlFor,
    label,
    isChecked,
    categoryId,
    value,
    onHandleCheckbox,
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
            }}
        >
            <Checkbox
                value={value}
                name={htmlFor}
                checked={isChecked}
                onChange={(e) => onHandleCheckbox(e, categoryId, isChecked)}
            />
            <label htmlFor={htmlFor}>{label}</label>
        </Box>
    );
};

export default CheckBoxComponent;
