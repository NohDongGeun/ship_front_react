import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import React from 'react';
import { getMarkets } from '../../api/markets';
import DefaultLayout from '../../components/commons/DefaultLayout';
import Layout from '../../components/market/markets/Layout';
import { GET_MARKETS_KEY } from '../../constants/queryKeys';
import { useGlobalWrapper } from '../../hooks/useGlobalSSR';
import { buildQueryString } from '../../utils/param';

interface IMarkets {
    queryString: string;
}

const Markets: React.FC<IMarkets> = ({ queryString }) => {
    return (
        <DefaultLayout title={'시장 목록'} selectedHref={'markets'}>
            <Layout queryString={queryString} />
        </DefaultLayout>
    );
};

export default Markets;

export const getServerSideProps = useGlobalWrapper(
    async (context: GetServerSidePropsContext, queryClient: QueryClient) => {
        const session = await getSession(context);
        const { query } = context;
        const queryString: string = buildQueryString(query);

        await queryClient.prefetchQuery({
            queryKey: [GET_MARKETS_KEY, queryString, session?.user.accessToken],
            queryFn: () => getMarkets(queryString, session?.user.accessToken),
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
