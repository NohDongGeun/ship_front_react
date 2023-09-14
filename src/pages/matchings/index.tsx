import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import React from 'react';
import { getMatchings } from '../../api/matchings';
import DefaultLayout from '../../components/commons/DefaultLayout';
import Layout from '../../components/matching/matchings/Layout';
import { GET_MATCHINGS_KEY } from '../../constants/queryKeys';
import { useGlobalWrapper } from '../../hooks/useGlobalSSR';
import { buildQueryString } from '../../utils/param';

interface IMatchings {
    queryString: string;
}

const Matchings: React.FC<IMatchings> = ({ queryString }) => {
    return (
        <DefaultLayout title={'매칭 목록'} selectedHref={'matchings'}>
            <Layout queryString={queryString} />
        </DefaultLayout>
    );
};

export default Matchings;

export const getServerSideProps = useGlobalWrapper(
    async (context: GetServerSidePropsContext, queryClient: QueryClient) => {
        const session = await getSession(context);
        const { query } = context;
        const queryString: string = buildQueryString(query);

        await queryClient.prefetchQuery({
            queryKey: [
                GET_MATCHINGS_KEY,
                queryString,
                session?.user.accessToken,
            ],
            queryFn: () => getMatchings(queryString, session?.user.accessToken),
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
