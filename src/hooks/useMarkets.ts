import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { getMarket, getMarkets } from '../api/markets';
import { GET_MARKETS_KEY, GET_MARKET_KEY } from '../constants/queryKeys';
import {
    hasDataResponse,
    hasDataResponseContent,
} from '../utils/dataTransformUtils';
import { isEnableFetch } from '../utils/utils';

export const useGetMarkets = (queryString: string) => {
    const session = useSession();
    const { isLoading, data, error, isError } = useQuery({
        queryKey: [
            GET_MARKETS_KEY,
            queryString,
            session.data?.user.accessToken,
        ],
        queryFn: () => getMarkets(queryString, session.data?.user.accessToken),
        staleTime: Infinity,
    });

    const markets = useMemo(() => {
        if (isError || error || !hasDataResponseContent(data)) return [];

        return data.response.content;
    }, [data, isError, error]);

    return markets;
};

export const useGetMarket = (marketId: string) => {
    const session = useSession();
    const { isLoading, data, error, isError } = useQuery({
        queryKey: [GET_MARKET_KEY, marketId, session.data?.user.accessToken],
        queryFn: () => getMarket(marketId, session.data?.user.accessToken),
        staleTime: Infinity,
        enabled: isEnableFetch(marketId),
    });

    const market = useMemo(() => {
        if (isError || error || !hasDataResponse(data)) return null;

        return data.response;
    }, [data, error, isError]);

    return market;
};

export const useGetMarketsCount = (queryString: string): number => {
    const session = useSession();
    const { isLoading, data, error, isError } = useQuery({
        queryKey: [
            GET_MARKETS_KEY,
            queryString,
            session.data?.user.accessToken,
        ],
        queryFn: () => getMarkets(queryString, session.data?.user.accessToken),
        staleTime: Infinity,
    });

    const count: number = useMemo(() => {
        if (isError || error || !hasDataResponseContent(data)) return 1;

        return data.response.totalPages;
    }, [data, isError, error]);

    return count;
};
