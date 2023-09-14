import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';
import { createAdmin } from '../../../api/admins';
import SubmitButton from '../../../components/commons/SubmitButton';
import { PATH_ADMINS } from '../../../constants/pathConstants';
import { useAddAdminStore } from '../../../store/admin/adminAddStore';
import { ICreateAdmin } from '../../../types/admin';

const SubmitContainer: React.FC = () => {
    const router = useRouter();
    const session = useSession();
    const {
        mutate,
        isLoading,
        isSuccess,
        isError,
    } = useMutation(
        (data: { admin: Partial<ICreateAdmin>; accessToken: string }) =>
            createAdmin(data.admin, data.accessToken)
    );

    const admin = useAddAdminStore((state) => state.admin);

    useEffect(() => {
        if (isSuccess) {
            router.push(PATH_ADMINS);
        }

        if (isError) {
            alert('어드민 등록에 실패하였습니다. 다시 시도해주세요.');
        }
    }, [isSuccess, isError]);

    const onSubmit = useCallback(() => {
        if (!admin) {
            return;
        }

        const accessToken = session.data?.user.accessToken;

        if (!accessToken) return;

        const { passwordVerify, ...createAdminData } = admin;

        const validateUser = (admin: ICreateAdmin): boolean => {
            for (let key in admin) {
                if (
                    admin[key as keyof ICreateAdmin] === '' ||
                    admin[key as keyof ICreateAdmin] === null ||
                    admin[key as keyof ICreateAdmin] === undefined
                ) {
                    return false;
                }
            }
            return true;
        };

        if (!validateUser(admin)) {
            alert('모든 항목을 입력해주세요.');
            return;
        }

        if (passwordVerify !== createAdminData.password) {
            // 비밀번호 불일치
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        mutate({ admin: createAdminData, accessToken });
    }, [admin, session]);

    return <SubmitButton onSubmit={onSubmit} />;
};

export default SubmitContainer;
