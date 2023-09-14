import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import {
    getServiceCategories,
    getServiceCategory,
} from '../api/serviceCategories';
import {
    GET_SERVICE_CATEGORIES_KEY,
    GET_SERVICE_CATEGORY_KEY,
} from '../constants/queryKeys';
import {
    hasDataResponse,
    hasDataResponseContent,
} from '../utils/dataTransformUtils';
import { isEnableFetch } from '../utils/utils';

export const useGetServiceCategories = (queryString: string) => {
    const session = useSession();
    const { isLoading, data, error, isError } = useQuery({
        queryKey: [
            GET_SERVICE_CATEGORIES_KEY,
            queryString,
            session.data?.user.accessToken,
        ],
        queryFn: () =>
            getServiceCategories(queryString, session.data?.user.accessToken),
        staleTime: Infinity,
    });

    const serviceCategoreis = useMemo(() => {
        if (isError || error || !hasDataResponseContent(data)) return [];

        return data.response.content;
    }, [data, isError, error]);

    return serviceCategoreis;
};

export const useGetServiceCategory = (serviceCategoryId: string) => {
    const session = useSession();
    const { isLoading, data, error, isError } = useQuery({
        queryKey: [
            GET_SERVICE_CATEGORY_KEY,
            serviceCategoryId,
            session.data?.user.accessToken,
        ],
        queryFn: () =>
            getServiceCategory(
                serviceCategoryId,
                session.data?.user.accessToken
            ),
        staleTime: Infinity,
        enabled: isEnableFetch(serviceCategoryId),
    });

    const serviceCategory = useMemo(() => {
        if (isError || error || !hasDataResponse(data)) return null;

        return data.response;
    }, [data, isError, error]);

    return serviceCategory;
};

export const useGetServiceCategoriesCount = (queryString: string): number => {
    const session = useSession();
    const { isLoading, data, error, isError } = useQuery({
        queryKey: [
            GET_SERVICE_CATEGORIES_KEY,
            queryString,
            session.data?.user.accessToken,
        ],
        queryFn: () =>
            getServiceCategories(queryString, session.data?.user.accessToken),
        staleTime: Infinity,
    });

    const count: number = useMemo(() => {
        if (isError || error || !hasDataResponseContent(data)) return 1;

        return data.response.totalPages;
    }, [data, isError, error]);

    return count;
};
