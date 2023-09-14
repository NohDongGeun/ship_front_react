import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import React from 'react';
import { getUsers } from '../../api/users';
import DefaultLayout from '../../components/commons/DefaultLayout';
import Layout from '../../components/user/users/Layout';
import { GET_USERS_KEY } from '../../constants/queryKeys';
import { useGlobalWrapper } from '../../hooks/useGlobalSSR';
import { buildQueryString } from '../../utils/param';

interface IUsers {
    queryString: string;
}

const Users: React.FC<IUsers> = ({ queryString }) => {
    return (
        <DefaultLayout title={'유저 목록'} selectedHref={'users'}>
            <Layout queryString={queryString} />
        </DefaultLayout>
    );
};

export default Users;

export const getServerSideProps = useGlobalWrapper(
    async (context: GetServerSidePropsContext, queryClient: QueryClient) => {
        const session = await getSession(context);
        const { query } = context;
        const queryString: string = buildQueryString(query);

        await queryClient.prefetchQuery({
            queryKey: [GET_USERS_KEY, queryString, session?.user.accessToken],
            queryFn: () => getUsers(queryString, session?.user.accessToken),
            staleTime: Infinity,
        });

        return {
            props: {
                session,
                queryString,
                dehydratedProps: JSON.parse(
                    JSON.stringify(dehydrate(queryClient))
                ),
            },
        };
    }
);
