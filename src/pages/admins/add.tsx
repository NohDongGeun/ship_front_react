import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import React from 'react';
import Layout from '../../components/admin/add/Layout';
import DefaultLayout from '../../components/commons/DefaultLayout';

import { useGlobalWrapper } from '../../hooks/useGlobalSSR';

const AddAdmin: React.FC = () => {
    return (
        <DefaultLayout title={'어드민 등록'} selectedHref={'admins'}>
            <Layout />
        </DefaultLayout>
    );
};

export default AddAdmin;

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
