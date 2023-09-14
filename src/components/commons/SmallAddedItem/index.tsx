import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

interface ISmallAddedItem {
    label: string;
    onDelete: React.MouseEventHandler<HTMLButtonElement>;
}

const SmallAddedItem: React.FC<ISmallAddedItem> = ({ label, onDelete }) => {
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '2px 10px 2px 18px',
                backgroundColor: getRandomColor,
                marginRight: '10px',
                borderRadius: '30px',
                minWidth: '60px',
                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            }}
        >
            <Typography sx={{}}>{label}</Typography>
            <IconButton sx={{}} onClick={onDelete}>
                <CloseIcon fontSize={'small'} />
            </IconButton>
        </Box>
    );
};

export default SmallAddedItem;
