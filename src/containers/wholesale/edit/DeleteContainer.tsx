import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import React, { useCallback } from 'react';
import { deleteExpert } from '../../../api/experts';
import SubmitButton from '../../../components/commons/SubmitButton';
import {
    PATH_EXPERTS,
    PATH_WHOLESALES,
} from '../../../constants/pathConstants';
import { useGetExpert } from '../../../hooks/useExperts';
import { useSubmitHandler } from '../../../hooks/useHandler';
import { IErrorResponse } from '../../../types/error';
import { useGetWholesale } from '../../../hooks/useWholesales';
import { deleteWholesale } from '../../../api/wholesales';

interface IDeleteContainer {
    userId: string;
    wholesaleId: string;
}

const DeleteContainer: React.FC<IDeleteContainer> = ({
    userId,
    wholesaleId,
}) => {
    const session = useSession();
    const wholesale = useGetWholesale(wholesaleId);
    const {
        mutate,
        isLoading,
        error,
        isSuccess,
    } = useMutation(
        (data: { userId: string; wholesaleId: string; accessToken: string }) =>
            deleteWholesale(data.userId, data.wholesaleId, data.accessToken)
    );

    useSubmitHandler(
        isLoading,
        isSuccess,
        PATH_WHOLESALES,
        error as AxiosError<IErrorResponse>
    );

    const onSubmit = useCallback(() => {
        if (!wholesale) return;
        const accessToken = session.data?.user.accessToken;

        if (wholesale.activate) {
            alert(
                '도소매의 상태가 활성화중입니다. 비활성화 후 다시 시도해주세요.'
            );
            return;
        }

        mutate({ userId, wholesaleId, accessToken });
    }, [userId, wholesaleId, wholesale]);

    return (
        <SubmitButton color={'error'} onSubmit={onSubmit} label={'delete'} />
    );
};

export default DeleteContainer;
