import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import React, { useCallback } from 'react';
import { deleteMarket } from '../../../api/markets';
import SubmitButton from '../../../components/commons/SubmitButton';
import { PATH_MARKETS } from '../../../constants/pathConstants';
import { useSubmitHandler } from '../../../hooks/useHandler';
import { useGetMarket } from '../../../hooks/useMarkets';
import { IErrorResponse } from '../../../types/error';

interface IDeleteContainer {
    marketId: string;
}

const DeleteContainer: React.FC<IDeleteContainer> = ({ marketId }) => {
    const session = useSession();
    const market = useGetMarket(marketId);
    const {
        mutate,
        isLoading,
        error,
        isSuccess,
    } = useMutation((data: { marketId: string; accessToken: string }) =>
        deleteMarket(data.marketId, data.accessToken)
    );

    useSubmitHandler(
        isLoading,
        isSuccess,
        PATH_MARKETS,
        error as AxiosError<IErrorResponse>
    );

    const onSubmit = useCallback(() => {
        if (!market) return;
        const accessToken = session.data?.user.accessToken;

        if (market.activate) {
            alert(
                '시장의 상태가 활성화중입니다. 비활성화 후 다시 시도해주세요.'
            );
            return;
        }

        mutate({ marketId, accessToken });
    }, [marketId, market]);

    return (
        <SubmitButton color={'error'} onSubmit={onSubmit} label={'delete'} />
    );
};

export default DeleteContainer;
