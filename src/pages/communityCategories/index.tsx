import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import { getCommunityCategories } from '../../api/communityCategories';
import DefaultLayout from '../../components/commons/DefaultLayout';
import Layout from '../../components/communityCategory/communityCategories/Layout';
import NextHead from '../../components/NextHeader';
import { GET_COMMUNITY_CATEGORIES_KEY } from '../../constants/queryKeys';
import { useGlobalWrapper } from '../../hooks/useGlobalSSR';
import { buildQueryString } from '../../utils/param';

interface ICommunityCategories {
    queryString: string;
}

const CommunityCategories: React.FC<ICommunityCategories> = ({
    queryString,
}) => {
    return (
        <>
            <NextHead title={'커뮤니티 카테고리'} />
            <DefaultLayout
                title={'커뮤니티 카테고리 목록'}
                selectedHref={'communityCategories'}
            >
                <Layout queryString={queryString} />
            </DefaultLayout>
        </>
    );
};

export default CommunityCategories;

export const getServerSideProps = useGlobalWrapper(
    async (context: GetServerSidePropsContext, queryClient: QueryClient) => {
        const session = await getSession(context);
        const { query } = context;
        const queryString: string = buildQueryString(query);

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
                queryString,
                dehydratedProps: JSON.parse(
                    JSON.stringify(dehydrate(queryClient))
                ),
            },
        };
    }
);
