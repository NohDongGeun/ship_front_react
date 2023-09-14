import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { getQna, getQnas } from '../api/qnas';
import { GET_QNAS_KEY, GET_QNA_KEY } from '../constants/queryKeys';
import {
    hasDataResponse,
    hasDataResponseContent,
} from '../utils/dataTransformUtils';
import { isEnableFetch } from '../utils/utils';

export const useGetQnas = (queryString: string) => {
    const session = useSession();
    const { isLoading, data, error, isError } = useQuery({
        queryKey: [GET_QNAS_KEY, queryString, session.data?.user.accessToken],
        queryFn: () => getQnas(queryString, session.data?.user.accessToken),
        staleTime: Infinity,
    });
    const qnas = useMemo(() => {
        if (isError || error || !hasDataResponseContent(data)) return [];

        return data.response.content;
    }, [isError, error, data]);

    return qnas;
};

export const useGetQna = (qnaId: string) => {
    const session = useSession();
    const { isLoading, data, error, isError } = useQuery({
        queryKey: [GET_QNA_KEY, qnaId, session.data?.user.accessToken],
        queryFn: () => getQna(qnaId, session.data?.user.accessToken),
        staleTime: Infinity,
        enabled: isEnableFetch(qnaId),
    });

    const qna = useMemo(() => {
        if (isError || error || !hasDataResponse(data)) return null;

        return data.response;
    }, [isError, error, data]);

    return qna;
};

export const useGetQnasCount = (queryString: string): number => {
    const session = useSession();
    const { isLoading, data, error, isError } = useQuery({
        queryKey: [GET_QNAS_KEY, queryString, session.data?.user.accessToken],
        queryFn: () => getQnas(queryString, session.data?.user.accessToken),
        staleTime: Infinity,
    });

    const count: number = useMemo(() => {
        if (isError || error || !hasDataResponseContent(data)) return 1;

        return data.response.totalPages;
    }, [isError, error, data]);

    return count;
};
