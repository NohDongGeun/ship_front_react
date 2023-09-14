import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import React from 'react';
import { getCommunityCategories } from '../../api/communityCategories';
import DefaultLayout from '../../components/commons/DefaultLayout';
import Layout from '../../components/community/add/Layout';
import { GET_COMMUNITY_CATEGORIES_KEY } from '../../constants/queryKeys';
import Handler from '../../containers/Handler';
import { useGlobalWrapper } from '../../hooks/useGlobalSSR';

const AddCommunity: React.FC = () => {
    return (
        <DefaultLayout title={'커뮤니티 등록'} selectedHref={'communities'}>
            <Layout />
            <Handler />
        </DefaultLayout>
    );
};

export default AddCommunity;

export const getServerSideProps = useGlobalWrapper(
    async (context: GetServerSidePropsContext, queryClient: QueryClient) => {
        const session = await getSession(context);

        const queryString = 'page=1&activate=true&limit=50';

        await queryClient.prefetchQuery({
            queryKey: [
                GET_COMMUNITY_CATEGORIES_KEY,
                queryString,
                session?.user.accessToken,
            ],
            queryFn: () =>
                getCommunityCategories(queryString, session?.user.accessToken),
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
