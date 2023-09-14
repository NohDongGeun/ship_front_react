import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import React, { useCallback } from 'react';
import { updateUser } from '../../../api/users';
import SubmitButton from '../../../components/commons/SubmitButton';
import { PATH_USERS } from '../../../constants/pathConstants';
import { useSubmitHandler } from '../../../hooks/useHandler';
import { useGetUser } from '../../../hooks/useUsers';
import { useEditUserStore } from '../../../store/user/userEditStore';
import { IErrorResponse } from '../../../types/error';
import { IUpdateUser } from '../../../types/user';

interface ISubmitContainer {
    userId: string;
}

interface ITempUpdateUser {
    name?: string;
    nickname?: string;
    phone?: string;
    identyKey?: string;
    activate?: boolean;
}

const SubmitContainer: React.FC<ISubmitContainer> = ({ userId }) => {
    const session = useSession();
    const oldUser = useGetUser(userId);

    const {
        mutate,
        isLoading,
        isSuccess,
        error,
    } = useMutation(
        (data: {
            user: Partial<IUpdateUser>;
            userId: string;
            accessToken: string;
        }) => updateUser(data.user, userId, data.accessToken)
    );
    const user = useEditUserStore((state) => state.user);

    useSubmitHandler(
        isLoading,
        isSuccess,
        PATH_USERS,
        error as AxiosError<IErrorResponse>
    );

    const onSubmit = useCallback(() => {
        if (!user || !oldUser) {
            return;
        }

        const accessToken = session.data?.user.accessToken;

        if (!accessToken) return;

        const updateUserData: ITempUpdateUser = {};

        if (user.name && oldUser.name !== user.name) {
            updateUserData.name = user.name;
        }

        if (user.nickname && oldUser.nickname !== user.nickname) {
            updateUserData.nickname = user.nickname;
        }

        if (oldUser.activate !== user.activate) {
            updateUserData.activate = user.activate;
        }

        mutate({ user: updateUserData, userId, accessToken });
    }, [user, userId, session, oldUser]);

    return <SubmitButton onSubmit={onSubmit} />;
};

export default SubmitContainer;
