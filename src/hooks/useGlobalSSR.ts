import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { checkAuthenticate } from '../api/auth';
import { PATH_SIGNIN } from '../constants/pathConstants';

export function useGlobalWrapper(gssp: any) {
    return async (context: GetServerSidePropsContext) => {
        const queryClient = new QueryClient();
        const session: Session | null = await getSession(context);
        if (!session) {
            return {
                redirect: {
                    destination: `${PATH_SIGNIN}?redirect=${context.req.url}`,
                    permanent: false,
                },
            };
        }

        try {
            const res = await checkAuthenticate(
                session.user.accessToken,
                session.user.xerk
            );

            // const res = await axios.get(
            //     'http://172.30.1.64/api/v1/auth/check',
            //     {
            //         responseType: 'json',
            //         headers: {
            //             Authorization: `Bearer ${session.user.accessToken}`,
            //             'X-ERK': `${session.user.xerk}`,
            //         },
            //     }
            // );
            if (!res.response || !res.response.authenticated) {
                return {
                    redirect: {
                        destination: `${PATH_SIGNIN}?redirect=${context.req.url}`,
                        permanent: false,
                    },
                };
            }
        } catch (error) {
            return {
                redirect: {
                    destination: `${PATH_SIGNIN}?redirect=${context.req.url}`,
                    permanent: false,
                },
            };
        }

        return await gssp(context, queryClient, session);
    };
}
