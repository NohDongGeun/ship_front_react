import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { getUser, getUsers } from '../api/users';
import { GET_USERS_KEY, GET_USER_KEY } from '../constants/queryKeys';
import {
    hasDataResponse,
    hasDataResponseContent,
} from '../utils/dataTransformUtils';
import { isEnableFetch } from '../utils/utils';

// 유저 목록
export const useGetUsers = (queryString: string) => {
    const session = useSession();
    const { isLoading, data, error, isError } = useQuery({
        queryKey: [GET_USERS_KEY, queryString, session.data?.user.accessToken],
        queryFn: () => getUsers(queryString, session.data?.user.accessToken),
        staleTime: Infinity,
    });

    const users = useMemo(() => {
        if (isError || error || !hasDataResponseContent(data)) return [];

        return data.response.content;
    }, [data, isError, error]);

    return users;
};

// 유저 디테일
export const useGetUser = (userId: string) => {
    const session = useSession();
    const { isLoading, data, error, isError } = useQuery({
        queryKey: [GET_USER_KEY, userId, session.data?.user.accessToken],
        queryFn: () => getUser(userId, session.data?.user.accessToken),
        staleTime: Infinity,
        enabled: isEnableFetch(userId),
    });

    const user = useMemo(() => {
        if (isError || error || !hasDataResponse(data)) return null;

        return data.response;
    }, [data, isError, error]);

    return user;
};

export const useGetUsersCount = (queryString: string): number => {
    const session = useSession();
    const { isLoading, data, error, isError } = useQuery({
        queryKey: [GET_USERS_KEY, queryString, session.data?.user.accessToken],
        queryFn: () => getUsers(queryString, session.data?.user.accessToken),
        staleTime: Infinity,
    });

    const count: number = useMemo(() => {
        if (isError || error || !hasDataResponseContent(data)) return 1;

        return data.response.totalPages;
    }, [data, isError, error]);

    return count;
};
