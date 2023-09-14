import { Box, Button } from '@mui/material';
import React from 'react';

interface IFilterButtons {
    onClickReset: React.MouseEventHandler<HTMLButtonElement>;
    onClickSearch: React.MouseEventHandler<HTMLButtonElement>;
}

const FilterButtons: React.FC<IFilterButtons> = ({
    onClickReset,
    onClickSearch,
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px 0 10px',
                // borderTop: '1px solid black',
            }}
        >
            <Button
                onClick={onClickReset}
                variant={'outlined'}
                sx={{ marginRight: '10px' }}
            >
                Reset
            </Button>
            <Button
                onClick={onClickSearch}
                variant={'contained'}
                sx={{ marginLeft: '10px' }}
            >
                Search
            </Button>
        </Box>
    );
};

export default React.memo(FilterButtons);
