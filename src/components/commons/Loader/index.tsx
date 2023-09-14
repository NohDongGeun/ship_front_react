import { Box, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 흐린 검은색 배경
        overflow: 'hidden', // 스크롤 막기
        zIndex: 9999, // 다른 요소 위에 보이게 하기
    },
}));

interface ILoader {}

const Loader: React.FC<ILoader> = ({}) => {
    const classes = useStyles();

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <Box className={classes.root}>
            <CircularProgress />
        </Box>
    );
};

export default Loader;
