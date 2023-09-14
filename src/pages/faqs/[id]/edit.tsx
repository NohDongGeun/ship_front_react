import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { getFaq } from '../../../api/faqs';
import { getServiceCategories } from '../../../api/serviceCategories';
import DefaultLayout from '../../../components/commons/DefaultLayout';
import Layout from '../../../components/faq/edit/Layout';
import {
    GET_FAQ_KEY,
    GET_SERVICE_CATEGORIES_KEY,
} from '../../../constants/queryKeys';
import Handler from '../../../containers/Handler';
import { useGetFaq } from '../../../hooks/useFaqs';
import { useGlobalWrapper } from '../../../hooks/useGlobalSSR';
import { useEditFaqStore } from '../../../store/faq/faqEditStore';

interface IEditFaq {
    faqId: string;
}

const EditFaq: React.FC<IEditFaq> = ({ faqId }) => {
    const [isInit, setIsInit] = useState(false);
    const init = useEditFaqStore((state) => state.init);
    const faq = useGetFaq(faqId);

    useEffect(() => {
        if (!faq) return;

        init({
            ...faq,
        });
        setIsInit(true);
    }, []);

    if (!isInit) {
        return <></>;
    }
    return (
        <DefaultLayout title={'FAQ 수정'} selectedHref={'faqs'}>
            <Layout faqId={faqId} />
            <Handler />
        </DefaultLayout>
    );
};

export default EditFaq;

export const getServerSideProps = useGlobalWrapper(
    async (context: GetServerSidePropsContext, queryClient: QueryClient) => {
        const {
            query: { id },
        } = context;
        const session = await getSession(context);

        const queryString =
            'page=1&searchType=type&searchTypeValue=FAQ&activate=true&limit=50';

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
                queryKey: [GET_FAQ_KEY, id, session?.user.accessToken],
                queryFn: () => getFaq(id as string, session?.user.accessToken),
                staleTime: Infinity,
            }),
        ]);

        return {
            props: {
                session,
                faqId: id as string,
                dehydratedProps: JSON.parse(
                    JSON.stringify(dehydrate(queryClient))
                ),
            },
        };
    }
);
