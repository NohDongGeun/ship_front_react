import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import React from 'react';
import { getServiceCategories } from '../../api/serviceCategories';
import DefaultLayout from '../../components/commons/DefaultLayout';
import Layout from '../../components/QNA/add/Layout';
import { GET_SERVICE_CATEGORIES_KEY } from '../../constants/queryKeys';
import Handler from '../../containers/Handler';
import { useGlobalWrapper } from '../../hooks/useGlobalSSR';

const AddQna: React.FC = () => {
    return (
        <DefaultLayout title={'QNA 추가'} selectedHref={'qnas'}>
            <Layout />
            <Handler />
        </DefaultLayout>
    );
};

export default AddQna;

export const getServerSideProps = useGlobalWrapper(
    async (context: GetServerSidePropsContext, queryClient: QueryClient) => {
        const session = await getSession(context);

        const queryString =
            'page=1&searchType=type&searchTypeValue=FAQ&activate=true&limit=50';

        await queryClient.prefetchQuery({
            queryKey: [
                GET_SERVICE_CATEGORIES_KEY,
                queryString,
                session?.user.accessToken,
            ],
            queryFn: () =>
                getServiceCategories(queryString, session?.user.accessToken),
            staleTime: Infinity,
        });

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
