import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import React, { useCallback } from 'react';
import { createExpert } from '../../../api/experts';
import SubmitButton from '../../../components/commons/SubmitButton';
import { PATH_EXPERTS } from '../../../constants/pathConstants';
import { useSubmitHandler } from '../../../hooks/useHandler';
import { useAddExpertStore } from '../../../store/expert/expertAddStore';
import { IErrorResponse } from '../../../types/error';

const SubmitContainer: React.FC = () => {
    const session = useSession();
    const expert = useAddExpertStore((state) => state.expert);

    const {
        mutate,
        isLoading,
        isSuccess,
        error,
    } = useMutation(
        (data: { formData: FormData; userId: string; accessToken: string }) =>
            createExpert(data.formData, data.userId, data.accessToken)
    );

    useSubmitHandler(
        isLoading,
        isSuccess,
        PATH_EXPERTS,
        error as AxiosError<IErrorResponse>
    );

    const onSubmit = useCallback(() => {
        const accessToken = session.data?.user.accessToken;

        if (!accessToken) return;

        const selectedMainCategories = expert.mainCategories
            .filter((item) => {
                if (item.middleCategories) {
                    return item.middleCategories.some(
                        (mitem) => mitem.isSelect
                    );
                } else {
                    return false;
                }
            })
            .map((item) => {
                return { id: item.id };
            });

        const selectedMiddleCategories = expert.mainCategories
            .flatMap((mainCategory) =>
                Array.isArray(mainCategory.middleCategories)
                    ? mainCategory.middleCategories
                    : []
            )
            .filter((middleCategory) => middleCategory.isSelect)
            .map((middleCategory) => ({ id: middleCategory.id }));

        let formData = new FormData();

        if (!expert.thumbnail) {
            alert('썸네일 이미지가 없습니다.');
            return;
        }

        if (!expert.imageFiles || expert.imageFiles.length <= 0) {
            alert('도소매 이미지가 없습니다.');
            return;
        }

        formData.append('thumbnail', expert.thumbnail.file!);

        for (let i = 0; i < expert.imageFiles.length; i++) {
            formData.append('images', expert.imageFiles[i].file!);
        }

        const tempExpert = {
            address: expert.address,
            latitude: Math.floor(Math.random() * 900000) + 100000,
            longitude: Math.floor(Math.random() * 900000) + 100000,
            name: expert.name,
            businessNumber: expert.businessNumber,
            marketId: expert.marketId,
            career: expert.career,
            profile: expert.profile,
            activate: expert.activate,
            content: expert.content,
            mainCategories: selectedMainCategories,
            middleCategories: selectedMiddleCategories,
        };

        if (!selectedMainCategories || selectedMainCategories.length === 0) {
            alert('메인 카테고리를 입력해주세요.');
            return;
        }

        if (
            !selectedMiddleCategories ||
            selectedMiddleCategories.length === 0
        ) {
            alert('미들 카테고리를 입력해주세요.');
            return;
        }

        formData.append(
            'expert',
            new Blob([JSON.stringify(tempExpert)], {
                type: 'application/json',
            })
        );

        console.log('tempExpert', tempExpert);
        mutate({ formData, userId: expert.uuid, accessToken });
    }, [expert]);

    return <SubmitButton onSubmit={onSubmit} />;
};

export default SubmitContainer;
