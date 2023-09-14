import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import React from 'react';
import { getMainCategories } from '../../api/categories';
import { getMarkets } from '../../api/markets';
import DefaultLayout from '../../components/commons/DefaultLayout';
import Layout from '../../components/expert/add/Layout';
import {
    GET_MAIN_CATEGORIES_KEY,
    GET_MARKETS_KEY,
} from '../../constants/queryKeys';
import Handler from '../../containers/Handler';
import { useGlobalWrapper } from '../../hooks/useGlobalSSR';

const AddWholesale: React.FC = () => {
    return (
        <DefaultLayout title={'전문가 추가'} selectedHref={'experts'}>
            <Layout />
            <Handler />
        </DefaultLayout>
    );
};

export default AddWholesale;

export const getServerSideProps = useGlobalWrapper(
    async (context: GetServerSidePropsContext, queryClient: QueryClient) => {
        const session = await getSession(context);

        const marketsQueryString = 'activate=true';
        const categoriesQueryString = 'page=1&limit=100&activate=true';

        await Promise.all([
            queryClient.prefetchQuery({
                queryKey: [
                    GET_MARKETS_KEY,
                    marketsQueryString,
                    session?.user.accessToken,
                ],
                queryFn: () =>
                    getMarkets(marketsQueryString, session?.user.accessToken),
                staleTime: Infinity,
            }),
            queryClient.prefetchQuery({
                queryKey: [
                    GET_MAIN_CATEGORIES_KEY,
                    categoriesQueryString,
                    session?.user.accessToken,
                ],
                queryFn: () =>
                    getMainCategories(
                        categoriesQueryString,
                        session?.user.accessToken
                    ),
                staleTime: Infinity,
            }),
        ]);

        return {
            props: {
                session,
                dehydratedProps: JSON.parse(
                    JSON.stringify(dehydrate(queryClient))
                ),
            },
        };
    }
);
