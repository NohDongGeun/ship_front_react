import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import React from 'react';
import DefaultLayout from '../../components/commons/DefaultLayout';
import Layout from '../../components/matching/add/Layout';
import Handler from '../../containers/Handler';
import { useGlobalWrapper } from '../../hooks/useGlobalSSR';

const AddMatching: React.FC = () => {
    return (
        <DefaultLayout title={'매칭 추가'} selectedHref={'matchings'}>
            <Layout />
            <Handler />
        </DefaultLayout>
    );
};

export default AddMatching;

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
