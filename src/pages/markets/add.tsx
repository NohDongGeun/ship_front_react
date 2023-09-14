import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import React from 'react';
import { getMainCategories } from '../../api/categories';
import DefaultLayout from '../../components/commons/DefaultLayout';
import Layout from '../../components/market/add/Layout';
import { GET_MAIN_CATEGORIES_KEY } from '../../constants/queryKeys';
import Handler from '../../containers/Handler';
import { useGlobalWrapper } from '../../hooks/useGlobalSSR';

const AddMarket: React.FC = ({}) => {
    return (
        <DefaultLayout title={'시장 추가'} selectedHref={'markets'}>
            <Layout />
            <Handler />
        </DefaultLayout>
    );
};

export default AddMarket;

export const getServerSideProps = useGlobalWrapper(
    async (context: GetServerSidePropsContext, queryClient: QueryClient) => {
        const session = await getSession(context);
        const queryString = 'page=1&limit=100&activate=true';

        await queryClient.prefetchQuery({
            queryKey: [
                GET_MAIN_CATEGORIES_KEY,
                queryString,
                session?.user.accessToken,
            ],
            queryFn: () =>
                getMainCategories(queryString, session?.user.accessToken),
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
