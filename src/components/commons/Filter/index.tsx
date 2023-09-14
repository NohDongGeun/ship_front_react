import { Box, Button, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

interface IFilter {
    children: React.ReactNode;
}

const Filter: React.FC<IFilter> = ({ children }) => {
    return (
        <Box
            sx={{
                width: '100%',
                border: '1px solid rgba(224, 224, 224, 1)',
                display: 'flex',
                flexDirection: 'column',
                padding: '10px 0',
                borderRadius: '6px',
                marginBottom: '40px',
            }}
        >
            {children}
        </Box>
    );
};

export default Filter;
