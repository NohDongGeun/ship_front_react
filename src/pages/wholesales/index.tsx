import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import React from 'react';
import { getWholesales } from '../../api/wholesales';
import DefaultLayout from '../../components/commons/DefaultLayout';
import Layout from '../../components/wholesale/wholesales/Layout';
import { GET_WHOLESALES_KEY } from '../../constants/queryKeys';
import { useGlobalWrapper } from '../../hooks/useGlobalSSR';
import { buildQueryString } from '../../utils/param';

interface IWholesales {
    queryString: string;
}

const Wholesales: React.FC<IWholesales> = ({ queryString }) => {
    return (
        <DefaultLayout title={'도소매 목록'} selectedHref={'wholesales'}>
            <Layout queryString={queryString} />
        </DefaultLayout>
    );
};

export default Wholesales;

export const getServerSideProps = useGlobalWrapper(
    async (context: GetServerSidePropsContext, queryClient: QueryClient) => {
        const session = await getSession(context);
        const { query } = context;
        const queryString: string = buildQueryString(query);

        await queryClient.prefetchQuery({
            queryKey: [
                GET_WHOLESALES_KEY,
                queryString,
                session?.user.accessToken,
            ],
            queryFn: () =>
                getWholesales(queryString, session?.user.accessToken),
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
