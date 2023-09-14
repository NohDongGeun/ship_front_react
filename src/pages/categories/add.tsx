import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import React from 'react';
import Layout from '../../components/category/add/Layout';
import DefaultLayout from '../../components/commons/DefaultLayout';
import Handler from '../../containers/Handler';
import { useGlobalWrapper } from '../../hooks/useGlobalSSR';

const AddCategory: React.FC = () => {
    return (
        <DefaultLayout title={'카테고리 추가'} selectedHref={'categories'}>
            <Layout />
            <Handler />
        </DefaultLayout>
    );
};

export default AddCategory;

export const getServerSideProps = useGlobalWrapper(
    async (context: GetServerSidePropsContext, queryClient: QueryClient) => {
        const session = await getSession(context);

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
