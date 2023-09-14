import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import React from 'react';
import { getFaqs } from '../../api/faqs';
import DefaultLayout from '../../components/commons/DefaultLayout';
import Layout from '../../components/faq/faqs/Layout';
import { GET_FAQS_KEY } from '../../constants/queryKeys';
import { useGlobalWrapper } from '../../hooks/useGlobalSSR';
import { buildQueryString } from '../../utils/param';

interface IFaqs {
    queryString: string;
}

const Faqs: React.FC<IFaqs> = ({ queryString }) => {
    return (
        <DefaultLayout title={'FAQ 목록'} selectedHref={'faqs'}>
            <Layout queryString={queryString} />
        </DefaultLayout>
    );
};

export default Faqs;

export const getServerSideProps = useGlobalWrapper(
    async (context: GetServerSidePropsContext, queryClient: QueryClient) => {
        const session = await getSession(context);
        const { query } = context;
        const queryString: string = buildQueryString(query);

        await queryClient.prefetchQuery({
            queryKey: [GET_FAQS_KEY, queryString, session?.user.accessToken],
            queryFn: () => getFaqs(queryString, session?.user.accessToken),
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
