import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../../components/commons/DefaultLayout';
import { useGlobalWrapper } from '../../../hooks/useGlobalSSR';
import { getExpert } from '../../../api/experts';
import { useGetExpert } from '../../../hooks/useExperts';
import { GET_EXPERT_KEY } from '../../../constants/queryKeys';
import Layout from '../../../components/expert/edit/Layout';
import Handler from '../../../containers/Handler';
import { useEditExpertStore } from '../../../store/expert/expertEditStore';
import { PATH_EXPERTS } from '../../../constants/pathConstants';

interface IEditExpert {
    userId: string;
    expertId: string;
}

const EditExpert: React.FC<IEditExpert> = ({ userId, expertId }) => {
    const [isInit, setIsInit] = useState(false);
    const init = useEditExpertStore((state) => state.init);
    const expert = useGetExpert(userId, expertId);

    useEffect(() => {
        if (!expert) return;
        init({
            ...expert,
            imageFiles: [],
            thumbnailImageFile: null,
        });
        setIsInit(true);
    }, [expert]);

    if (!isInit) {
        return <></>;
    }
    return (
        <DefaultLayout title={'전문가 수정'} selectedHref={'experts'}>
            <Layout userId={userId} expertId={expertId} />
            <Handler />
        </DefaultLayout>
    );
};

export default EditExpert;

export const getServerSideProps = useGlobalWrapper(
    async (context: GetServerSidePropsContext, queryClient: QueryClient) => {
        const {
            query: { id, userUUId },
        } = context;

        if (!userUUId) {
            return {
                redirect: {
                    destination: `${PATH_EXPERTS}`,
                    permanent: false,
                },
            };
        }

        const session = await getSession(context);

        await queryClient.prefetchQuery({
            queryKey: [GET_EXPERT_KEY, userUUId, id, session?.user.accessToken],
            queryFn: () =>
                getExpert(
                    userUUId as string,
                    id as string,
                    session?.user.accessToken
                ),
            staleTime: Infinity,
        });

        return {
            props: {
                session,
                expertId: id,
                userId: userUUId,
                dehydratedProps: JSON.parse(
                    JSON.stringify(dehydrate(queryClient))
                ),
            },
        };
    }
);
