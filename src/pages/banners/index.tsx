import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import React from 'react';
import { getBanners } from '../../api/banners';
import Layout from '../../components/banner/banners/Layout';
import DefaultLayout from '../../components/commons/DefaultLayout';
import { GET_BANNERS_KEY } from '../../constants/queryKeys';
import { useGlobalWrapper } from '../../hooks/useGlobalSSR';
import { buildQueryString } from '../../utils/param';

interface IBanners {
    queryString: string;
}

const Banners: React.FC<IBanners> = ({ queryString }) => {
    return (
        <DefaultLayout title={'배너 목록'} selectedHref={'banners'}>
            <Layout queryString={queryString} />
        </DefaultLayout>
    );
};

export default Banners;

export const getServerSideProps = useGlobalWrapper(
    async (context: GetServerSidePropsContext, queryClient: QueryClient) => {
        const session = await getSession(context);
        const { query } = context;
        const queryString: string = buildQueryString(query);

        await queryClient.prefetchQuery({
            queryKey: [GET_BANNERS_KEY, queryString, session?.user.accessToken],
            queryFn: () => getBanners(queryString, session?.user.accessToken),
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
