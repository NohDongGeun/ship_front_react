import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { getSession, useSession } from 'next-auth/react';
import React from 'react';
import Layout from '../components/banner/banners/Layout';
import DefaultLayout from '../components/commons/DefaultLayout';
import { useGlobalWrapper } from '../hooks/useGlobalSSR';
import auth from './api/auth/[...nextauth]';

const Banners: React.FC = () => {
    const { data: session } = useSession();

    return (
        <DefaultLayout title={'배너 목록'} selectedHref={'banners'}>
            <Layout />
        </DefaultLayout>
    );
};

export default Banners;

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const session = await getSession(context);
    return {
        props: {
            session,
            // dehydratedProps: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        },
    };
};
