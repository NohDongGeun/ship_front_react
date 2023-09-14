import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import React, { useCallback } from 'react';
import { createBanner } from '../../../api/banners';
import SubmitButton from '../../../components/commons/SubmitButton';
import { PATH_BANNERS } from '../../../constants/pathConstants';
import { useSubmitHandler } from '../../../hooks/useHandler';
import { useAddBannerStore } from '../../../store/banner/bannerAddStore';
import { ICreateBanner } from '../../../types/banner';
import { IErrorResponse } from '../../../types/error';

const SubmitContainer: React.FC = () => {
    const session = useSession();
    const banner = useAddBannerStore((state) => state.banner);

    const {
        mutate,
        isLoading,
        isSuccess,
        error,
    } = useMutation((data: { formData: FormData; accessToken: string }) =>
        createBanner(data.formData, data.accessToken)
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

        const validateBanner = (user: ICreateBanner): boolean => {
            for (let key in user) {
                if (
                    user[key as keyof ICreateBanner] === '' ||
                    user[key as keyof ICreateBanner] === null ||
                    user[key as keyof ICreateBanner] === undefined
                ) {
                    return false;
                }
            }
            return true;
        };

        if (!validateBanner(banner)) {
            alert('잘못된 입력입니다. 다시 입력해주세요.');
            return;
        }

        let formData = new FormData();

        const tempBanner = {
            link: banner.path,
            activate: banner.activate,
        };

        formData.append('image', banner.imageFile!.file!);

        formData.append(
            'banner',
            new Blob([JSON.stringify(tempBanner)], {
                type: 'application/json',
            })
        );

        mutate({ formData, accessToken });
    }, [banner]);

    return <SubmitButton onSubmit={onSubmit} />;
};

export default SubmitContainer;
