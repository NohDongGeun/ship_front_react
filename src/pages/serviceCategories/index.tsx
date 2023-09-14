import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import { getServiceCategories } from '../../api/serviceCategories';
import DefaultLayout from '../../components/commons/DefaultLayout';
import Layout from '../../components/serviceCategory/serviceCategories/Layout';
import { GET_SERVICE_CATEGORIES_KEY } from '../../constants/queryKeys';
import { useGlobalWrapper } from '../../hooks/useGlobalSSR';
import { buildQueryString } from '../../utils/param';

interface IServiceCategories {
    queryString: string;
}

const ServiceCategories: React.FC<IServiceCategories> = ({ queryString }) => {
    return (
        <DefaultLayout
            title={'서비스 카테고리 목록'}
            selectedHref={'serviceCategories'}
        >
            <Layout queryString={queryString} />
        </DefaultLayout>
    );
};

export default ServiceCategories;

export const getServerSideProps = useGlobalWrapper(
    async (context: GetServerSidePropsContext, queryClient: QueryClient) => {
        const session = await getSession(context);
        const { query } = context;
        const queryString: string = buildQueryString(query);

        await queryClient.prefetchQuery({
            queryKey: [
                GET_SERVICE_CATEGORIES_KEY,
                queryString,
                session?.user.accessToken,
            ],
            queryFn: () =>
                getServiceCategories(queryString, session?.user.accessToken),
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
