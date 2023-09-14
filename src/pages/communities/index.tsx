import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import React from 'react';
import { getCommunities } from '../../api/communities';
import DefaultLayout from '../../components/commons/DefaultLayout';
import Layout from '../../components/community/communities/Layout';
import { GET_COMMUNITIES_KEY } from '../../constants/queryKeys';
import { useGlobalWrapper } from '../../hooks/useGlobalSSR';
import { buildQueryString } from '../../utils/param';

interface ICommunities {
    queryString: string;
}

const Communities: React.FC<ICommunities> = ({ queryString }) => {
    return (
        <DefaultLayout title={'커뮤니티 목록'} selectedHref={'communities'}>
            <Layout queryString={queryString} />
        </DefaultLayout>
    );
};

export default Communities;

export const getServerSideProps = useGlobalWrapper(
    async (context: GetServerSidePropsContext, queryClient: QueryClient) => {
        const session = await getSession(context);
        const { query } = context;
        const queryString: string = buildQueryString(query);

        await queryClient.prefetchQuery({
            queryKey: [
                GET_COMMUNITIES_KEY,
                queryString,
                session?.user.accessToken,
            ],
            queryFn: () =>
                getCommunities(queryString, session?.user.accessToken),
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
