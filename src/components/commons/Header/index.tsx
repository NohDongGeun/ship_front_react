import { Box, Button, Typography } from '@mui/material';
import React from 'react';

interface IHeader {
    title: string;
    addLabel: string;
    addHref: string;
}

const Header: React.FC<IHeader> = ({ title, addLabel, addHref }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: '20px',
            }}
        >
            <Typography
                variant="h2"
                color="initial"
                fontWeight={'bold'}
                fontSize={'24px'}
            >
                {/* {title} */}
            </Typography>
            <Button component={'a'} href={addHref} variant={'contained'}>
                {addLabel}
            </Button>
        </Box>
    );
};

export default Header;
