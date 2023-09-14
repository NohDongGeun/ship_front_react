import { Box } from '@mui/material';
import React from 'react';

interface IAddedWrapper {
    children: React.ReactNode;
}

const AddedWrapper: React.FC<IAddedWrapper> = ({ children }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '20px 20px',
            }}
        >
            {children}
        </Box>
    );
};

export default AddedWrapper;
