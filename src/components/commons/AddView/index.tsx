import React from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

interface IAddView {
    title: string;
    children: React.ReactNode;
    submitContainer: React.ReactNode;
    deleteContainer?: React.ReactNode;
}

const AddView: React.FC<IAddView> = ({
    title,
    children,
    submitContainer,
    deleteContainer,
}) => {
    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: '800px',
                margin: '0 auto',
            }}
        >
            <Box
                component={'main'}
                sx={{
                    width: '100%',
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        padding: '40px',
                        flexDirection: 'column',
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '20px 0 30px',
                        }}
                    >
                        <Typography
                            variant="h2"
                            color="#3A98DA"
                            fontWeight={'700'}
                            fontSize={'24px'}
                        >
                            {title}
                        </Typography>
                        <Box>
                            {deleteContainer}
                            {submitContainer}
                        </Box>
                    </Box>

                    {children}
                </Box>
            </Box>
        </Box>
    );
};

export default AddView;
