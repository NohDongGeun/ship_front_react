import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { getCommunity } from '../../../api/communities';
import { getCommunityCategories } from '../../../api/communityCategories';
import DefaultLayout from '../../../components/commons/DefaultLayout';
import Layout from '../../../components/community/edit/Layout';
import {
    GET_COMMUNITY_CATEGORIES_KEY,
    GET_COMMUNITY_KEY,
} from '../../../constants/queryKeys';
import Handler from '../../../containers/Handler';
import { useGetCommunity } from '../../../hooks/useCommunities';
import { useGlobalWrapper } from '../../../hooks/useGlobalSSR';
import { useEditCommunityStore } from '../../../store/community/communityEditStore';

interface IEditCommunity {
    communityId: string;
}

const EditCommunity: React.FC<IEditCommunity> = ({ communityId }) => {
    const [isInit, setIsInit] = useState(false);
    const init = useEditCommunityStore((state) => state.init);
    const community = useGetCommunity(communityId);

    useEffect(() => {
        if (!community) return;
        init({
            ...community,
        });
        setIsInit(true);
    }, [community]);

    if (!isInit) {
        return <></>;
    }
    return (
        <DefaultLayout title={'커뮤니티 수정'} selectedHref={'communities'}>
            <Layout communityId={communityId} />
            <Handler />
        </DefaultLayout>
    );
};

export default EditCommunity;

export const getServerSideProps = useGlobalWrapper(
    async (context: GetServerSidePropsContext, queryClient: QueryClient) => {
        const {
            query: { id },
        } = context;
        const session = await getSession(context);

        const queryString = 'page=1&activate=true&limit=50';

        await Promise.all([
            queryClient.prefetchQuery({
                queryKey: [
                    GET_COMMUNITY_CATEGORIES_KEY,
                    queryString,
                    session?.user.accessToken,
                ],
                queryFn: () =>
                    getCommunityCategories(
                        queryString,
                        session?.user.accessToken
                    ),
                staleTime: Infinity,
            }),
            queryClient.prefetchQuery({
                queryKey: [GET_COMMUNITY_KEY, id, session?.user.accessToken],
                queryFn: () =>
                    getCommunity(id as string, session?.user.accessToken),
                staleTime: Infinity,
            }),
        ]);

        return {
            props: {
                session,
                communityId: id as string,
                dehydratedProps: JSON.parse(
                    JSON.stringify(dehydrate(queryClient))
                ),
            },
        };
    }
);
