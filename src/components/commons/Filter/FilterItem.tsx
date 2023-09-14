import { Box, Typography } from '@mui/material';
import React from 'react';

interface IFilterItem {
    label: string;
    children: React.ReactNode;
}

const FilterItem: React.FC<IFilterItem> = ({ label, children }) => {
    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '10px 20px',
                marginBottom: '10px',
            }}
        >
            <Typography
                fontSize={'12px'}
                sx={{ width: '100px', marginRight: '5px' }}
            >
                {label}
            </Typography>
            {children}
        </Box>
    );
};

export default FilterItem;
