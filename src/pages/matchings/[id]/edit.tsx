import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { getMatching } from '../../../api/matchings';
import DefaultLayout from '../../../components/commons/DefaultLayout';
import Layout from '../../../components/matching/edit/Layout';
import { GET_MATCHING_KEY } from '../../../constants/queryKeys';
import Handler from '../../../containers/Handler';
import { useGlobalWrapper } from '../../../hooks/useGlobalSSR';
import { useGetMatching } from '../../../hooks/useMatchings';
import { useEditMatchingStore } from '../../../store/matching/matchingEditStore';

interface IEditMatching {
    matchingId: string;
}

const EditMatching: React.FC<IEditMatching> = ({ matchingId }) => {
    const [isInit, setIsInit] = useState(false);
    const init = useEditMatchingStore((state) => state.init);
    const matching = useGetMatching(matchingId);

    useEffect(() => {
        if (!matching) return;
        init(matching);
        setIsInit(true);
    }, []);

    if (!isInit) {
        return <></>;
    }

    return (
        <DefaultLayout title={'매칭 수정'} selectedHref={'matchings'}>
            <Layout matchingId={matchingId} />
            <Handler />
        </DefaultLayout>
    );
};

export default EditMatching;

export const getServerSideProps = useGlobalWrapper(
    async (context: GetServerSidePropsContext, queryClient: QueryClient) => {
        const {
            query: { id },
        } = context;

        const session = await getSession(context);

        await queryClient.prefetchQuery({
            queryKey: [GET_MATCHING_KEY, id, session?.user.accessToken],
            queryFn: () => getMatching(id as string, session?.user.accessToken),
            staleTime: Infinity,
        });

        return {
            props: {
                session,
                matchingId: id,
                dehydratedProps: JSON.parse(
                    JSON.stringify(dehydrate(queryClient))
                ),
            },
        };
    }
);
