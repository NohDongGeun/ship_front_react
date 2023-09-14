import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { getWholesale, getWholesales } from '../api/wholesales';
import { GET_WHOLESALES_KEY, GET_WHOLESALE_KEY } from '../constants/queryKeys';
import {
    hasDataResponse,
    hasDataResponseContent,
} from '../utils/dataTransformUtils';
import { isEnableFetch } from '../utils/utils';

export const useGetWholesales = (queryString: string) => {
    const session = useSession();
    const { isLoading, data, error, isError } = useQuery({
        queryKey: [
            GET_WHOLESALES_KEY,
            queryString,
            session.data?.user.accessToken,
        ],
        queryFn: () =>
            getWholesales(queryString, session.data?.user.accessToken),
        staleTime: Infinity,
    });

    const wholesales = useMemo(() => {
        if (isError || error || !hasDataResponseContent(data)) return [];
        return data.response.content;
    }, [isError, error, data]);

    return wholesales;
};

export const useGetWholesale = (wholesaleId: string) => {
    const session = useSession();
    const { isLoading, data, error, isError } = useQuery({
        queryKey: [
            GET_WHOLESALE_KEY,
            wholesaleId,
            session.data?.user.accessToken,
        ],
        queryFn: () =>
            getWholesale(wholesaleId, session.data?.user.accessToken),
        staleTime: Infinity,
        enabled: isEnableFetch(wholesaleId),
    });

    const wholesale = useMemo(() => {
        if (isError || error || !hasDataResponse(data)) return null;
        return data.response;
    }, [data, isError, error]);

    return wholesale;
};

export const useGetWholesalesCount = (queryString: string): number => {
    const session = useSession();
    const { isLoading, data, error, isError } = useQuery({
        queryKey: [
            GET_WHOLESALES_KEY,
            queryString,
            session.data?.user.accessToken,
        ],
        queryFn: () =>
            getWholesales(queryString, session.data?.user.accessToken),
        staleTime: Infinity,
    });

    const count: number = useMemo(() => {
        if (isError || error || !hasDataResponseContent(data)) return 1;

        return data.response.totalPages;
    }, [isError, error, data]);

    return count;
};
