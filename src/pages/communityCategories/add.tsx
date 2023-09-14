import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import React from 'react';
import DefaultLayout from '../../components/commons/DefaultLayout';
import Layout from '../../components/communityCategory/add/Layout';
import Handler from '../../containers/Handler';
import { useGlobalWrapper } from '../../hooks/useGlobalSSR';

const AddCommunityCategory: React.FC = () => {
    return (
        <DefaultLayout
            title={'커뮤니티 카테고리 추가'}
            selectedHref={'communityCategories'}
        >
            <Layout />
            <Handler />
        </DefaultLayout>
    );
};

export default AddCommunityCategory;

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
