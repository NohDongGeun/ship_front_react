import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import React, { useCallback } from 'react';
import { updateBanner } from '../../../api/banners';
import SubmitButton from '../../../components/commons/SubmitButton';
import { PATH_BANNERS } from '../../../constants/pathConstants';
import { useGetBanner } from '../../../hooks/useBanners';
import { useSubmitHandler } from '../../../hooks/useHandler';
import { useEditBannerStore } from '../../../store/banner/bannerEditStore';
import { IEditBanner } from '../../../types/banner';
import { IErrorResponse } from '../../../types/error';
import { isEmptyObject } from '../../../utils/dataTransformUtils';

interface ISubmitContainer {
    bannerId: string;
}

const SubmitContainer: React.FC<ISubmitContainer> = ({ bannerId }) => {
    const session = useSession();
    const banner = useEditBannerStore((state) => state.banner);
    const oldbie = useGetBanner(bannerId);

    const {
        mutate,
        isLoading,
        isSuccess,
        error,
    } = useMutation(
        (data: { formData: FormData; bannerId: string; accessToken: string }) =>
            updateBanner(data.formData, data.bannerId, data.accessToken)
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

        if (!accessToken) return;

        if (!banner.path || !banner.thumbnail) {
            alert('잘못된 입력입니다. 다시 입력해주세요.');
            return;
        }

        if (
            oldbie.path === banner.path &&
            oldbie.thumbnail &&
            !banner.imageFile &&
            oldbie.activate === banner.activate
        ) {
            alert('변경사항이 없습니다.');
            return;
        }

        let formData = new FormData();

        const tempBanner: Partial<IEditBanner> = {};

        if (oldbie.path !== banner.path) {
            // 경로 수정
            tempBanner.link = banner.path;
        }

        if (oldbie.activate !== banner.activate) {
            tempBanner.activate = banner.activate;
        }

        if (banner.imageFile) {
            formData.append('image', banner.imageFile.file!);
        }

        if (!isEmptyObject(tempBanner)) {
            formData.append(
                'banner',
                new Blob([JSON.stringify(tempBanner)], {
                    type: 'application/json',
                })
            );
        }

        mutate({ formData, bannerId, accessToken });
    }, [oldbie, banner, bannerId, session]);

    return <SubmitButton onSubmit={onSubmit} />;
};

export default SubmitContainer;
