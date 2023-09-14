import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { getAdmin, getAdmins } from '../api/admins';
import { GET_ADMINS_KEY, GET_ADMIN_KEY } from '../constants/queryKeys';
import {
    hasDataResponse,
    hasDataResponseContent,
} from '../utils/dataTransformUtils';
import { isEnableFetch } from '../utils/utils';

export const useGetAdmins = (queryString: string) => {
    const session = useSession();
    const { isLoading, data, error, isError } = useQuery({
        queryKey: [GET_ADMINS_KEY, queryString, session.data?.user.accessToken],
        queryFn: () => getAdmins(queryString, session.data?.user.accessToken),
        staleTime: Infinity,
    });

    const admins = useMemo(() => {
        if (isError || error || !hasDataResponseContent(data)) return [];
        return data.response.content;
    }, [data, isError, error]);

    return admins;
};

export const useGetAdmin = (adminId: string) => {
    const session = useSession();
    const { isLoading, data, error, isError } = useQuery({
        queryKey: [GET_ADMIN_KEY, adminId, session.data?.user.accessToken],
        queryFn: () => getAdmin(adminId, session.data?.user.accessToken),
        staleTime: Infinity,
        enabled: isEnableFetch(adminId),
    });

    const admin = useMemo(() => {
        if (isError || error || !hasDataResponse(data)) return null;

        return data.response;
    }, [data, isError, error]);

    return admin;
};

export const useGetAdminsCount = (queryString: string): number => {
    const session = useSession();
    const { isLoading, data, error, isError } = useQuery({
        queryKey: [GET_ADMINS_KEY, queryString, session.data?.user.accessToken],
        queryFn: () => getAdmins(queryString, session.data?.user.accessToken),
        staleTime: Infinity,
    });

    const count: number = useMemo(() => {
        if (isError || error || !hasDataResponseContent(data)) return 1;

        return data.response.totalPages;
    }, [data, isError, error]);

    return count;
};
