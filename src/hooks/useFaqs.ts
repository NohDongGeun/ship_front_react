import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { getFaq, getFaqs } from '../api/faqs';
import { GET_FAQS_KEY, GET_FAQ_KEY } from '../constants/queryKeys';
import {
    hasDataResponse,
    hasDataResponseContent,
} from '../utils/dataTransformUtils';
import { isEnableFetch } from '../utils/utils';

export const useGetFaqs = (queryString: string) => {
    const session = useSession();
    const { isLoading, data, error, isError } = useQuery({
        queryKey: [GET_FAQS_KEY, queryString, session.data?.user.accessToken],
        queryFn: () => getFaqs(queryString, session.data?.user.accessToken),
        staleTime: Infinity,
    });

    const faqs = useMemo(() => {
        if (isError || error || !hasDataResponseContent(data)) {
            return [];
        }

        return data.response.content;
    }, [data, isError, error]);

    return faqs;
};

export const useGetFaq = (faqId: string) => {
    const session = useSession();
    const { isLoading, data, error, isError } = useQuery({
        queryKey: [GET_FAQ_KEY, faqId, session.data?.user.accessToken],
        queryFn: () => getFaq(faqId, session.data?.user.accessToken),
        staleTime: Infinity,
        enabled: isEnableFetch(faqId),
    });

    const faq = useMemo(() => {
        if (isError || error || !hasDataResponse(data)) {
            return null;
        }

        return data.response;
    }, [data, isError, error]);

    return faq;
};

export const useGetFaqsCount = (queryString: string): number => {
    const session = useSession();
    const { isLoading, data, error, isError } = useQuery({
        queryKey: [GET_FAQS_KEY, queryString, session.data?.user.accessToken],
        queryFn: () => getFaqs(queryString, session.data?.user.accessToken),
        staleTime: Infinity,
    });

    const count: number = useMemo(() => {
        if (isError || error || !hasDataResponseContent(data)) {
            return 1;
        }

        return data.response.totalPages;
    }, [data, isError, error]);

    return count;
};
