import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { getQna } from '../../../api/qnas';
import { getServiceCategories } from '../../../api/serviceCategories';
import DefaultLayout from '../../../components/commons/DefaultLayout';
import Layout from '../../../components/QNA/edit/Layout';
import {
    GET_QNA_KEY,
    GET_SERVICE_CATEGORIES_KEY,
} from '../../../constants/queryKeys';
import Handler from '../../../containers/Handler';
import { useGlobalWrapper } from '../../../hooks/useGlobalSSR';
import { useGetQna } from '../../../hooks/useQnas';
import { useEditQnaStore } from '../../../store/qna/qnaEditStore';

interface IEditQna {
    qnaId: string;
}

const EditQna: React.FC<IEditQna> = ({ qnaId }) => {
    const [isInit, setIsInit] = useState(false);
    const init = useEditQnaStore((state) => state.init);
    const qna = useGetQna(qnaId);

    useEffect(() => {
        if (!qna) return;
        init({
            ...qna,
        });
        setIsInit(true);
    }, [qna]);

    if (!isInit) {
        return <></>;
    }
    return (
        <DefaultLayout title={'QNA 수정'} selectedHref={'qnas'}>
            <Layout qnaId={qnaId} />
            <Handler />
        </DefaultLayout>
    );
};

export default EditQna;

export const getServerSideProps = useGlobalWrapper(
    async (context: GetServerSidePropsContext, queryClient: QueryClient) => {
        const {
            query: { id },
        } = context;
        const session = await getSession(context);

        const queryString =
            'page=1&searchType=type&searchTypeValue=QNA&activate=true&limit=50';

        await Promise.all([
            queryClient.prefetchQuery({
                queryKey: [
                    GET_SERVICE_CATEGORIES_KEY,
                    queryString,
                    session?.user.accessToken,
                ],
                queryFn: () =>
                    getServiceCategories(
                        queryString,
                        session?.user.accessToken
                    ),
                staleTime: Infinity,
            }),
            queryClient.prefetchQuery({
                queryKey: [GET_QNA_KEY, id, session?.user.accessToken],
                queryFn: () => getQna(id as string, session?.user.accessToken),
                staleTime: Infinity,
            }),
        ]);

        return {
            props: {
                session,
                qnaId: id as string,
                dehydratedProps: JSON.parse(
                    JSON.stringify(dehydrate(queryClient))
                ),
            },
        };
    }
);
