import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { getCommunities, getCommunity } from '../api/communities';
import { GET_COMMUNITIES_KEY, GET_COMMUNITY_KEY } from '../constants/queryKeys';
import {
    hasDataResponse,
    hasDataResponseContent,
} from '../utils/dataTransformUtils';
import { isEnableFetch } from '../utils/utils';

export const useGetCommunities = (queryString: string) => {
    const session = useSession();
    const { isLoading, data, error, isError } = useQuery({
        queryKey: [
            GET_COMMUNITIES_KEY,
            queryString,
            session.data?.user.accessToken,
        ],
        queryFn: () =>
            getCommunities(queryString, session.data?.user.accessToken),
        staleTime: Infinity,
    });

    const communities = useMemo(() => {
        if (isError || error || !hasDataResponseContent(data)) return [];

        return data.response.content;
    }, [isError, error, data]);

    return communities;
};

export const useGetCommunity = (communityId: string) => {
    const session = useSession();
    const { isLoading, data, error, isError } = useQuery({
        queryKey: [
            GET_COMMUNITY_KEY,
            communityId,
            session.data?.user.accessToken,
        ],
        queryFn: () =>
            getCommunity(communityId, session.data?.user.accessToken),
        staleTime: Infinity,
        enabled: isEnableFetch(communityId),
    });

    const community = useMemo(() => {
        if (isError || error || !hasDataResponse(data)) return null;
        return data.response;
    }, [isError, error, data]);

    return community;
};

export const useGetCommunitiesCount = (queryString: string): number => {
    const session = useSession();
    const { isLoading, data, error, isError } = useQuery({
        queryKey: [
            GET_COMMUNITIES_KEY,
            queryString,
            session.data?.user.accessToken,
        ],
        queryFn: () =>
            getCommunities(queryString, session.data?.user.accessToken),
        staleTime: Infinity,
    });

    const count: number = useMemo(() => {
        if (isError || error || !hasDataResponseContent(data)) return 1;

        return data.response.totalPages;
    }, [isError, error, data]);

    return count;
};
