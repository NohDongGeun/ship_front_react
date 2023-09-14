import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import React from 'react';
import Layout from '../../components/banner/add/Layout';
import DefaultLayout from '../../components/commons/DefaultLayout';
import Handler from '../../containers/Handler';
import { useGlobalWrapper } from '../../hooks/useGlobalSSR';

const AddBanner: React.FC = () => {
    return (
        <DefaultLayout title={'배너 추가'} selectedHref={'banners'}>
            <Layout />
            <Handler />
        </DefaultLayout>
    );
};

export default AddBanner;

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
