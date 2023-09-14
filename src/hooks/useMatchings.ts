import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { getMatching } from '../api/matchings';
import { GET_MATCHINGS_KEY, GET_MATCHING_KEY } from '../constants/queryKeys';
import {
    hasDataResponse,
    hasDataResponseContent,
} from '../utils/dataTransformUtils';
import { isEnableFetch } from '../utils/utils';

export const useGetMatchings = (queryString: string) => {
    const session = useSession();
    const { isLoading, data, error, isError } = useQuery({
        queryKey: [
            GET_MATCHINGS_KEY,
            queryString,
            session.data?.user.accessToken,
        ],
        queryFn: () => getMatching(queryString, session.data?.user.accessToken),
        staleTime: Infinity,
    });

    const matchings = useMemo(() => {
        if (isError || error || !hasDataResponseContent(data)) return [];

        return data.response.content;
    }, [data, error, isError]);

    return matchings;
};

export const useGetMatching = (matchingId: string) => {
    const session = useSession();
    const { isLoading, data, error, isError } = useQuery({
        queryKey: [
            GET_MATCHING_KEY,
            matchingId,
            session.data?.user.accessToken,
        ],
        queryFn: () => getMatching(matchingId, session.data?.user.accessToken),
        staleTime: Infinity,
        enabled: isEnableFetch(matchingId),
    });

    const matching = useMemo(() => {
        if (isError || error || !hasDataResponse(data)) return null;

        return data.response;
    }, [data, isError, error]);

    return matching;
};

export const useGetMatchingsCount = (queryString: string): number => {
    const session = useSession();
    const { isLoading, data, error, isError } = useQuery({
        queryKey: [
            GET_MATCHINGS_KEY,
            queryString,
            session.data?.user.accessToken,
        ],
        queryFn: () => getMatching(queryString, session.data?.user.accessToken),
        staleTime: Infinity,
    });

    const count: number = useMemo(() => {
        if (isError || error || !hasDataResponseContent(data)) return 1;

        return data.response.totalPages;
    }, [data, error, isError]);

    return count;
};
