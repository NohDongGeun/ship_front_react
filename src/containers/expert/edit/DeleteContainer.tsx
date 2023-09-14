import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import React, { useCallback } from 'react';
import { deleteExpert } from '../../../api/experts';
import SubmitButton from '../../../components/commons/SubmitButton';
import { PATH_EXPERTS } from '../../../constants/pathConstants';
import { useGetExpert } from '../../../hooks/useExperts';
import { useSubmitHandler } from '../../../hooks/useHandler';
import { IErrorResponse } from '../../../types/error';

interface IDeleteContainer {
    userId: string;
    expertId: string;
}

const DeleteContainer: React.FC<IDeleteContainer> = ({ userId, expertId }) => {
    const session = useSession();
    const expert = useGetExpert(userId, expertId);
    const {
        mutate,
        isLoading,
        error,
        isSuccess,
    } = useMutation(
        (data: { userId: string; expertId: string; accessToken: string }) =>
            deleteExpert(data.userId, data.expertId, data.accessToken)
    );

    useSubmitHandler(
        isLoading,
        isSuccess,
        PATH_EXPERTS,
        error as AxiosError<IErrorResponse>
    );

    const onSubmit = useCallback(() => {
        if (!expert) return;
        const accessToken = session.data?.user.accessToken;

        if (expert.activate) {
            alert(
                '전문가의 상태가 활성화중입니다. 비활성화 후 다시 시도해주세요.'
            );
            return;
        }

        mutate({ userId, expertId, accessToken });
    }, [userId, expertId, expert]);

    return (
        <SubmitButton color={'error'} onSubmit={onSubmit} label={'delete'} />
    );
};

export default DeleteContainer;
