import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useCallback, useMemo } from 'react';
import { getBanner, getBanners } from '../api/banners';
import { GET_BANNERS_KEY, GET_BANNER_KEY } from '../constants/queryKeys';
import { ICreateBanner } from '../types/banner';
import {
    hasDataResponse,
    hasDataResponseContent,
} from '../utils/dataTransformUtils';
import { isEnableFetch } from '../utils/utils';

export const useGetBanners = (queryString: string) => {
    const session = useSession();
    const { isLoading, data, error, isError } = useQuery({
        queryKey: [
            GET_BANNERS_KEY,
            queryString,
            session.data?.user.accessToken,
        ],
        queryFn: () => getBanners(queryString, session.data?.user.accessToken),
        staleTime: Infinity,
    });

    const banners = useMemo(() => {
        if (isError || error || !hasDataResponseContent(data)) return [];

        return data.response.content;
    }, [data, isError, error]);

    return banners;
};

export const useGetBanner = (bannerId: string) => {
    const session = useSession();
    const { isLoading, data, error, isError } = useQuery({
        queryKey: [GET_BANNER_KEY, bannerId, session.data?.user.accessToken],
        queryFn: () => getBanner(bannerId, session.data?.user.accessToken),
        staleTime: Infinity,
        enabled: isEnableFetch(bannerId),
    });

    const banner = useMemo(() => {
        if (isError || error || !hasDataResponse(data)) return null;

        return data.response;
    }, [data, isError, error]);

    return banner;
};

export const useGetBannersCount = (queryString: string): number => {
    const session = useSession();
    const { isLoading, data, error, isError } = useQuery({
        queryKey: [
            GET_BANNERS_KEY,
            queryString,
            session.data?.user.accessToken,
        ],
        queryFn: () => getBanners(queryString, session.data?.user.accessToken),
        staleTime: Infinity,
    });

    const count: number = useMemo(() => {
        if (isError || error || !hasDataResponseContent(data)) return 1;

        return data.response.totalPages;
    }, [data, isError, error]);

    return count;
};
