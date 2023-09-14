import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { getCommunityCategory } from '../../../api/communityCategories';
import DefaultLayout from '../../../components/commons/DefaultLayout';
import Layout from '../../../components/communityCategory/edit/Layout';
import { GET_COMMUNITY_CATEGORY_KEY } from '../../../constants/queryKeys';
import Handler from '../../../containers/Handler';
import { useGetCommunityCategory } from '../../../hooks/useCommunityCategories';
import { useGlobalWrapper } from '../../../hooks/useGlobalSSR';
import { useEditCommunityCategoryStore } from '../../../store/communityCategory/communityCategoryEditStore';

interface IEditServiceCategory {
    categoryId: string;
}

const EditCommunityCategory: React.FC<IEditServiceCategory> = ({
    categoryId,
}) => {
    const [isInit, setIsInit] = useState(false);
    const init = useEditCommunityCategoryStore((state) => state.init);
    const communityCategory = useGetCommunityCategory(categoryId);

    useEffect(() => {
        if (!communityCategory) return;
        init(communityCategory);
        setIsInit(true);
    }, []);

    if (!isInit) {
        return <></>;
    }

    return (
        <DefaultLayout
            title={'커뮤니티 카테고리 수정'}
            selectedHref={'communityCategories'}
        >
            <Layout categoryId={categoryId} />
            <Handler />
        </DefaultLayout>
    );
};

export default EditCommunityCategory;

export const getServerSideProps = useGlobalWrapper(
    async (context: GetServerSidePropsContext, queryClient: QueryClient) => {
        const {
            query: { id },
        } = context;

        const session = await getSession(context);

        await queryClient.prefetchQuery({
            queryKey: [
                GET_COMMUNITY_CATEGORY_KEY,
                id,
                session?.user.accessToken,
            ],
            queryFn: () =>
                getCommunityCategory(id as string, session?.user.accessToken),
            staleTime: Infinity,
        });

        return {
            props: {
                session,
                categoryId: id,
                dehydratedProps: JSON.parse(
                    JSON.stringify(dehydrate(queryClient))
                ),
            },
        };
    }
);
