import React, { useCallback, useEffect, useRef, useState } from 'react';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Typography, Button } from '@mui/material';

interface ICollapseBox {
    title: string;
    children: React.ReactNode;
}

const CollapseBox: React.FC<ICollapseBox> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const onClickCollapse = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    return (
        <Box
            sx={{
                backgroundColor: '#F1F3F4',
                padding: '10px 20px',
                borderRadius: '8px',
                marginBottom: '40px',
            }}
        >
            <Button
                variant="text"
                color="primary"
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                }}
                onClick={onClickCollapse}
            >
                <ExpandLessIcon
                    fontSize={'large'}
                    color={'primary'}
                    sx={{
                        stroke: '#3A98DA',
                        strokeWidth: 1,
                        marginRight: '10px',
                        transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)',
                        transition: 'transform 0.5s ease',
                    }}
                />
                <Typography variant="h6" color="primary" fontWeight="600">
                    {title}
                </Typography>
            </Button>

            <Collapse in={isOpen}>
                <Box sx={{ marginTop: '20px', width: '100%' }}>{children}</Box>
            </Collapse>
        </Box>
    );
};

export default CollapseBox;
