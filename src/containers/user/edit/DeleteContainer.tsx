import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import React, { useCallback } from 'react';
import { deleteUser } from '../../../api/users';
import SubmitButton from '../../../components/commons/SubmitButton';
import { PATH_USERS } from '../../../constants/pathConstants';
import { useSubmitHandler } from '../../../hooks/useHandler';
import { useGetUser } from '../../../hooks/useUsers';
import { IErrorResponse } from '../../../types/error';

interface IDeleteContainer {
    userId: string;
}

const DeleteContainer: React.FC<IDeleteContainer> = ({ userId }) => {
    const session = useSession();
    const user = useGetUser(userId);
    const {
        isLoading,
        isSuccess,
        error,
        mutate,
    } = useMutation((data: { userId: string; accessToken: string }) =>
        deleteUser(data.userId, data.accessToken)
    );

    useSubmitHandler(
        isLoading,
        isSuccess,
        PATH_USERS,
        error as AxiosError<IErrorResponse>
    );

    const onSubmit = useCallback(() => {
        if (!user) return;

        if (user.activate) {
            alert('해당 유저는 활성화된 유저입니다. 비활성화 후 삭제해주세요.');
            return;
        }
        const accessToken = session.data?.user.accessToken;

        mutate({ userId, accessToken });
    }, [userId, session, user]);

    return (
        <SubmitButton color={'error'} onSubmit={onSubmit} label={'delete'} />
    );
};

export default React.memo(DeleteContainer);
