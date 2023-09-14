import React, { useState } from 'react';
import Header from '../Header';
import { Box } from '@mui/material';

interface IListView {
    title: string;
    addLabel: string;
    addHref: string;
    children: React.ReactNode;
}

const ListView: React.FC<IListView> = ({
    title,
    addLabel,
    addHref,
    children,
}) => {
    return (
        <Box sx={{ width: '100%', boxSizing: 'border-box' }}>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '50px',
                    boxSizing: 'border-box',
                }}
            >
                <Header title={title} addLabel={addLabel} addHref={addHref} />
                {children}
            </Box>
        </Box>
    );
};

export default ListView;
