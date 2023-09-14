import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import { getExperts } from '../../api/experts';
import DefaultLayout from '../../components/commons/DefaultLayout';
import Layout from '../../components/expert/experts/Layout';
import { GET_EXPERTS_KEY } from '../../constants/queryKeys';
import { useGlobalWrapper } from '../../hooks/useGlobalSSR';
import { buildQueryString } from '../../utils/param';

interface IExperts {
    queryString: string;
}

const Experts: React.FC<IExperts> = ({ queryString }) => {
    return (
        <DefaultLayout title={'전문가 목록'} selectedHref={'experts'}>
            <Layout queryString={queryString} />
        </DefaultLayout>
    );
};

export default Experts;

export const getServerSideProps = useGlobalWrapper(
    async (context: GetServerSidePropsContext, queryClient: QueryClient) => {
        const session = await getSession(context);
        const { query } = context;
        const queryString: string = buildQueryString(query);

        await queryClient.prefetchQuery({
            queryKey: [GET_EXPERTS_KEY, queryString, session?.user.accessToken],
            queryFn: () => getExperts(queryString, session?.user.accessToken),
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
