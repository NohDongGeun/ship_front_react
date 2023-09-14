import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { getExpert, getExperts } from '../api/experts';
import { GET_EXPERTS_KEY, GET_EXPERT_KEY } from '../constants/queryKeys';
import {
    hasDataResponse,
    hasDataResponseContent,
} from '../utils/dataTransformUtils';
import { isEnableFetch } from '../utils/utils';

export const useGetExperts = (queryString: string) => {
    const session = useSession();
    const { isLoading, data, error, isError } = useQuery({
        queryKey: [
            GET_EXPERTS_KEY,
            queryString,
            session.data?.user.accessToken,
        ],
        queryFn: () => getExperts(queryString, session.data?.user.accessToken),
        staleTime: Infinity,
    });

    const experts = useMemo(() => {
        if (isError || error || !hasDataResponseContent(data)) return [];
        return data.response.content;
    }, [isError, error, data]);

    return experts;
};

export const useGetExpert = (userId: string, expertId: string) => {
    const session = useSession();
    const { isLoading, data, error, isError } = useQuery({
        queryKey: [
            GET_EXPERT_KEY,
            userId,
            expertId,
            session.data?.user.accessToken,
        ],
        queryFn: () =>
            getExpert(userId, expertId, session.data?.user.accessToken),
        staleTime: Infinity,
        enabled: isEnableFetch(expertId),
    });

    const expert = useMemo(() => {
        if (isError || error || !hasDataResponse(data)) return null;
        return data.response;
    }, [error, isError, data]);

    return expert;
};

export const useGetExpertsCount = (queryString: string): number => {
    const session = useSession();
    const { isLoading, data, error, isError } = useQuery({
        queryKey: [
            GET_EXPERTS_KEY,
            queryString,
            session.data?.user.accessToken,
        ],
        queryFn: () => getExperts(queryString, session.data?.user.accessToken),
        staleTime: Infinity,
    });

    const count: number = useMemo(() => {
        if (isError || error || !hasDataResponseContent(data)) return 1;

        return data.response.totalPages;
    }, [isError, error, data]);

    return count;
};
