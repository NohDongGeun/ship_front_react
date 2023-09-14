import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';
import { updateAdmin } from '../../../api/admins';
import { PATH_ADMINS } from '../../../constants/pathConstants';
import { useEditAdminStore } from '../../../store/admin/adminEditStore';
import { IEditAdmin } from '../../../types/admin';
import SubmitButton from '../../../components/commons/SubmitButton';
import { useGetAdmin } from '../../../hooks/useAdmins';
import { useSubmitHandler } from '../../../hooks/useHandler';
import { AxiosError } from 'axios';
import { IErrorResponse } from '../../../types/error';

interface ISubmitContainer {
    adminId: string;
}

const SubmitContainer: React.FC<ISubmitContainer> = ({ adminId }) => {
    const router = useRouter();
    const session = useSession();
    const {
        isLoading,
        mutate,
        isSuccess,
        error,
    } = useMutation(
        (data: { admin: Partial<IEditAdmin>; accessToken: string }) =>
            updateAdmin(`${adminId}`, data.admin, data.accessToken)
    );
    const oldbie = useGetAdmin(adminId);
    const admin = useEditAdminStore((state) => state.admin);

    useSubmitHandler(
        isLoading,
        isSuccess,
        PATH_ADMINS,
        error as AxiosError<IErrorResponse>
    );

    const onSubmit = useCallback(() => {
        if (!admin) return;

        const accessToken = session.data?.user.accessToken;
        if (!accessToken) return;

        const { passwordVerify, ...updateAdminData } = admin;

        const validateUser = (admin: IEditAdmin): boolean => {
            if (!admin.name) {
                return false;
            }

            if (!admin.nickname) {
                return false;
            }

            if (!admin.identyKey) {
                return false;
            }

            if (!admin.phone) {
                return false;
            }
            return true;
        };

        if (!validateUser(admin)) {
            alert('모든 항목을 입력해주세요.');
            return;
        }

        const updateAdmin: Partial<IEditAdmin> = {};

        if (oldbie.name !== admin.name) {
            updateAdmin.name = admin.name;
        }

        if (oldbie.nickname !== admin.nickname) {
            updateAdmin.nickname = admin.nickname;
        }

        if (oldbie.identyKey !== admin.identyKey) {
            updateAdmin.identyKey = admin.identyKey;
        }

        if (oldbie.phone !== admin.phone) {
            updateAdmin.phone = admin.phone;
        }

        if (admin.password && admin.password.length > 0) {
            if (admin.password !== admin.passwordVerify) {
                alert('비밀번호가 일치하지 않습니다.');
                return;
            }

            updateAdmin.password = admin.password;
        }

        mutate({ admin: updateAdmin, accessToken });
    }, [admin, oldbie]);

    return <SubmitButton onSubmit={onSubmit} />;
};

export default SubmitContainer;
