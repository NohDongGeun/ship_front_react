import { SelectChangeEvent } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';

interface IuseSetter {
    setter: (
        newState: Partial<{
            page: number;
            searchType: string;
            searchTypeValue: string;
            activate: string;
            startDate: Date | null | undefined;
            endDate: Date | null | undefined;
            limit: number;
        }>
    ) => void;
}

export const useSearch = ({ setter }: IuseSetter) => {
    const onSelectSearchType = useCallback(
        (e: SelectChangeEvent<string>) => {
            const value = e.target.value;
            setter({ searchType: value });
        },
        [setter]
    );

    const onChangeSearchInput = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const value = e.target.value;

            setter({ searchTypeValue: value });
        },
        [setter]
    );

    return {
        onSelectSearchType,
        onChangeSearchInput,
    };
};

export const useActivate = ({ setter }: IuseSetter) => {
    const onSelectStatus = useCallback((e: SelectChangeEvent<string>) => {
        const value = e.target.value;
        setter({ activate: value });
    }, []);

    return { onSelectStatus };
};

export const usePagination = () => {};

export const useDate = ({ setter }: IuseSetter) => {
    const onSetDate = useCallback(
        (start: Date | null | undefined, end: Date | null | undefined) => {
            setter({
                startDate: start,
                endDate: end,
            });
        },
        []
    );

    return {
        onSetDate,
    };
};

interface IuseFilter extends IuseSetter {
    path: string;
    params: string;
}

export const useFilter = ({ setter, path, params }: IuseFilter) => {
    const router = useRouter();
    useEffect(() => {
        setter({
            ...router.query,
            startDate: router.query.startDate
                ? new Date(router.query.startDate as string)
                : null,
            endDate: router.query.endDate
                ? new Date(router.query.endDate as string)
                : null,
        });
    }, []);

    const onClickReset = useCallback(() => {
        window.location.href = path;
    }, [path, params]);

    const onClickSearch = () => {
        router.push(`${path}?${params}`);
    };

    return {
        onClickReset,
        onClickSearch,
    };
};
