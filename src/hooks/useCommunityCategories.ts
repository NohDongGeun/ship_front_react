import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import {
    getCommunityCategories,
    getCommunityCategory,
} from '../api/communityCategories';
import {
    GET_COMMUNITY_CATEGORIES_KEY,
    GET_COMMUNITY_KEY,
} from '../constants/queryKeys';
import {
    hasDataResponse,
    hasDataResponseContent,
} from '../utils/dataTransformUtils';
import { isEnableFetch } from '../utils/utils';

export const useGetCommunityCategories = (queryString: string) => {
    const session = useSession();
    const { isLoading, data, error, isError } = useQuery({
        queryKey: [
            GET_COMMUNITY_CATEGORIES_KEY,
            queryString,
            session.data?.user.accessToken,
        ],
        queryFn: () =>
            getCommunityCategories(queryString, session.data?.user.accessToken),
        staleTime: Infinity,
    });

    const communityCategories = useMemo(() => {
        if (isError || error || !hasDataResponseContent(data)) return [];

        return data.response.content;
    }, [data, isError, error]);

    return communityCategories;
};

export const useGetCommunityCategory = (categoryId: string) => {
    const session = useSession();
    const { isLoading, data, error, isError } = useQuery({
        queryKey: [
            GET_COMMUNITY_KEY,
            categoryId,
            session.data?.user.accessToken,
        ],
        queryFn: () =>
            getCommunityCategory(categoryId, session.data?.user.accessToken),
        staleTime: Infinity,
        enabled: isEnableFetch(categoryId),
    });

    const communityCategory = useMemo(() => {
        if (isError || error || !hasDataResponse(data)) return null;

        return data.response;
    }, [data, isError, error]);

    return communityCategory;
};

export const useGetCommunityCategoriesCount = (queryString: string): number => {
    const session = useSession();
    const { isLoading, data, error, isError } = useQuery({
        queryKey: [
            GET_COMMUNITY_CATEGORIES_KEY,
            queryString,
            session.data?.user.accessToken,
        ],
        queryFn: () =>
            getCommunityCategories(queryString, session.data?.user.accessToken),
        staleTime: Infinity,
    });

    const count = useMemo(() => {
        if (isError || error || !hasDataResponseContent(data)) return 1;

        return data.response.totalPages;
    }, [data, isError, error]);

    return count;
};
