import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { deleteAdmin } from '../../../api/admins';
import { PATH_ADMINS } from '../../../constants/pathConstants';
import { useSubmitHandler } from '../../../hooks/useHandler';
import { AxiosError } from 'axios';
import { IErrorResponse } from '../../../types/error';
import SubmitButton from '../../../components/commons/SubmitButton';

interface IDeleteContainer {
    adminId: string;
}

const DeleteContainer: React.FC<IDeleteContainer> = ({ adminId }) => {
    const router = useRouter();
    const session = useSession();
    const {
        isLoading,
        mutate,
        isSuccess,
        error,
    } = useMutation((data: { adminId: string; accessToken: string }) =>
        deleteAdmin(data.adminId, data.accessToken)
    );

    useSubmitHandler(
        isLoading,
        isSuccess,
        PATH_ADMINS,
        error as AxiosError<IErrorResponse>
    );

    const onDelete = useCallback(() => {
        const accessToken = session.data?.user.accessToken;

        if (!accessToken) return;

        mutate({ adminId: adminId ? `${adminId}` : `0`, accessToken });
    }, [adminId]);

    return (
        <SubmitButton color={'error'} onSubmit={onDelete} label={'delete'} />
    );
};

export default DeleteContainer;
