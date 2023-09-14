import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import React from 'react';
import { getQnas } from '../../api/qnas';
import DefaultLayout from '../../components/commons/DefaultLayout';
import Layout from '../../components/QNA/QNAS/Layout';
import { GET_QNAS_KEY } from '../../constants/queryKeys';
import { useGlobalWrapper } from '../../hooks/useGlobalSSR';
import { buildQueryString } from '../../utils/param';

interface IQnas {
    queryString: string;
}

const Qnas: React.FC<IQnas> = ({ queryString }) => {
    return (
        <DefaultLayout title={'QNA 목록'} selectedHref={'qnas'}>
            <Layout queryString={queryString} />
        </DefaultLayout>
    );
};

export default Qnas;

export const getServerSideProps = useGlobalWrapper(
    async (context: GetServerSidePropsContext, queryClient: QueryClient) => {
        const session = await getSession(context);
        const { query } = context;
        const queryString: string = buildQueryString(query);

        await queryClient.prefetchQuery({
            queryKey: [GET_QNAS_KEY, queryString, session?.user.accessToken],
            queryFn: () => getQnas(queryString, session?.user.accessToken),
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
