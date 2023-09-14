import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import React from 'react';
import { getMainCategories } from '../../api/categories';
import Layout from '../../components/category/categories/Layout';
import DefaultLayout from '../../components/commons/DefaultLayout';
import { GET_MAIN_CATEGORIES_KEY } from '../../constants/queryKeys';
import { useGlobalWrapper } from '../../hooks/useGlobalSSR';
import { buildQueryString } from '../../utils/param';

interface ICategories {
    queryString: string;
}

const Categories: React.FC<ICategories> = ({ queryString }) => {
    return (
        <DefaultLayout title={'카테고리 목록'} selectedHref={'categories'}>
            <Layout queryString={queryString} />
        </DefaultLayout>
    );
};

export default Categories;

export const getServerSideProps = useGlobalWrapper(
    async (context: GetServerSidePropsContext, queryClient: QueryClient) => {
        const session = await getSession(context);
        const { query } = context;
        const queryString: string = buildQueryString(query);

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
