import { Box, Button, TextField, Typography } from '@mui/material';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import React from 'react';
import { PATH_BANNERS } from '../constants/pathConstants';
import { useLogin } from '../hooks/useLogin';
import { isTokenExpired } from '../utils/jwt';

const Signin: React.FC = () => {
    const {
        identyKey,
        password,
        onChangePassword,
        onChangeEmail,
        onSubmit,
    } = useLogin();

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100%',
            }}
        >
            <Box
                component="form"
                onSubmit={onSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#F1F3F4',
                    padding: '30px',
                    borderRadius: '10px',
                }}
            >
                <Typography
                    variant="h1"
                    sx={{
                        marginBottom: '30px',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }}
                >
                    Login
                </Typography>
                <TextField
                    required
                    variant="outlined"
                    placeholder="Email"
                    autoFocus
                    type={'text'}
                    sx={{
                        borderRadius: '4px',
                        backgroundColor: '#fff',
                        flex: 1,
                        width: '300px',
                        marginBottom: '20px',
                        overflow: 'hidden',
                    }}
                    value={identyKey}
                    onChange={onChangeEmail}
                />
                <TextField
                    required
                    variant="outlined"
                    placeholder="Password"
                    autoFocus
                    type={'password'}
                    sx={{
                        borderRadius: '4px',
                        backgroundColor: '#fff',
                        flex: 1,
                        width: '300px',
                        marginBottom: '20px',
                    }}
                    value={password}
                    onChange={onChangePassword}
                />
                <Button type={'submit'} variant="contained">
                    로그인
                </Button>
            </Box>
        </Box>
    );
};

export default Signin;

export const getServerSideProps = async (
    context: GetServerSidePropsContext
    // queryClient: QueryClient
) => {
    const session = await getSession(context);

    if (session && !isTokenExpired(session.user.accessToken)) {
        return {
            redirect: {
                destination: `${PATH_BANNERS}`,
                permanent: false,
            },
        };
    }

    const queryClient = new QueryClient();
    return {
        props: {
            dehydratedProps: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        },
    };
};
