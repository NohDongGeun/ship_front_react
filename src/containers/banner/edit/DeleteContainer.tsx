import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import React, { useCallback } from 'react';
import { deleteBanner } from '../../../api/banners';
import SubmitButton from '../../../components/commons/SubmitButton';
import { PATH_BANNERS } from '../../../constants/pathConstants';
import { useGetBanner } from '../../../hooks/useBanners';
import { useSubmitHandler } from '../../../hooks/useHandler';
import { IErrorResponse } from '../../../types/error';

interface IDeleteContainer {
    bannerId: string;
}

const DeleteContainer: React.FC<IDeleteContainer> = ({ bannerId }) => {
    const session = useSession();
    const banner = useGetBanner(bannerId);
    const {
        mutate,
        isLoading,
        error,
        isSuccess,
    } = useMutation((data: { bannerId: string; accessToken: string }) =>
        deleteBanner(data.bannerId, data.accessToken)
    );

    useSubmitHandler(
        isLoading,
        isSuccess,
        PATH_BANNERS,
        error as AxiosError<IErrorResponse>
    );

    const onSubmit = useCallback(() => {
        if (!banner) return;
        const accessToken = session.data?.user.accessToken;

        if (banner.activate) {
            alert(
                '배너의 상태가 활성화중입니다. 비활성화 후 다시 시도해주세요.'
            );
            return;
        }

        mutate({ bannerId, accessToken });
    }, [bannerId, banner]);

    return (
        <SubmitButton color={'error'} onSubmit={onSubmit} label={'delete'} />
    );
};

export default DeleteContainer;
