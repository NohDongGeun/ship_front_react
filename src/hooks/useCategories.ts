import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useCallback, useMemo } from 'react';
import { getMainCategories, getMainCategory } from '../api/categories';
import {
    GET_MAIN_CATEGORIES_KEY,
    GET_MAIN_CATEGORY_KEY,
} from '../constants/queryKeys';
import { IAddedCategory, ICategory, IMiddleCategory } from '../types/category';
import {
    hasDataResponse,
    hasDataResponseContent,
} from '../utils/dataTransformUtils';
import { isEnableFetch } from '../utils/utils';

export const useGetMainCategories = (queryString: string) => {
    const session = useSession();
    const { isLoading, data, error, isError } = useQuery({
        queryKey: [
            GET_MAIN_CATEGORIES_KEY,
            queryString,
            session.data?.user.accessToken,
        ],
        queryFn: () =>
            getMainCategories(queryString, session.data?.user.accessToken),
        staleTime: Infinity,
    });

    const mainCategories = useMemo(() => {
        if (isError || error || !hasDataResponseContent(data)) {
            return [];
        }

        return data.response.content;
    }, [data, isError, error]);

    return mainCategories;
};

export const useGetMainCategory = (categoryId: string) => {
    const session = useSession();
    const { isLoading, data, error, isError } = useQuery({
        queryKey: [
            GET_MAIN_CATEGORY_KEY,
            categoryId,
            session.data?.user.accessToken,
        ],
        queryFn: () =>
            getMainCategory(categoryId, session.data?.user.accessToken),
        staleTime: Infinity,
        enabled: isEnableFetch(categoryId),
    });

    const mainCategory = useMemo(() => {
        if (isError || error || !hasDataResponse(data)) return null;

        const category = data.response.mainCategory;
        const middleCategories = data.response.middleCategories
            ? data.response.middleCategories
            : [];

        category.middleCategories = middleCategories;

        return category;
    }, [data, isError, error]);

    return mainCategory;
};

export const useGetCategoriesCount = (queryString: string): number => {
    const session = useSession();
    const { isLoading, data, error, isError } = useQuery({
        queryKey: [
            GET_MAIN_CATEGORIES_KEY,
            queryString,
            session.data?.user.accessToken,
        ],
        queryFn: () =>
            getMainCategories(queryString, session.data?.user.accessToken),
        staleTime: Infinity,
    });

    const count = useMemo(() => {
        if (isError || error || !hasDataResponseContent(data)) {
            return 1;
        }

        return data.response.totalPages;
    }, [data, isError, error]);

    return count;
};
