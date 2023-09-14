import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import React, { useCallback } from 'react';
import { createUser } from '../../../api/users';
import SubmitButton from '../../../components/commons/SubmitButton';
import { PATH_USERS } from '../../../constants/pathConstants';
import { useSubmitHandler } from '../../../hooks/useHandler';
import { useAddUserStore } from '../../../store/user/userAddStore';
import { IErrorResponse } from '../../../types/error';
import { ICreateUser } from '../../../types/user';

const SubmitContainer: React.FC = () => {
    const session = useSession();
    const user = useAddUserStore((state) => state.user);
    const {
        mutate,
        isLoading,
        isSuccess,
        error,
    } = useMutation(
        (data: { user: Partial<ICreateUser>; accessToken: string }) =>
            createUser(data.user, data.accessToken)
    );

    useSubmitHandler(
        isLoading,
        isSuccess,
        PATH_USERS,
        error as AxiosError<IErrorResponse>
    );

    const onSubmit = useCallback(() => {
        if (!user) {
            return;
        }

        const accessToken = session.data?.user.accessToken;

        if (!accessToken) return;

        const { passwordVerify, ...createUserData } = user;

        const validateUser = (user: ICreateUser): boolean => {
            for (let key in user) {
                if (
                    user[key as keyof ICreateUser] === '' ||
                    user[key as keyof ICreateUser] === null ||
                    user[key as keyof ICreateUser] === undefined
                ) {
                    return false;
                }
            }
            return true;
        };

        if (!validateUser(user)) {
            return;
        }

        if (passwordVerify !== createUserData.password) {
            // 비밀번호 불일치
            return;
        }

        mutate({ user: createUserData, accessToken });
    }, [user, session]);

    return <SubmitButton onSubmit={onSubmit} />;
};

export default SubmitContainer;
