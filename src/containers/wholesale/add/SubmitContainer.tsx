import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import React, { useCallback } from 'react';
import { createWholesale } from '../../../api/wholesales';
import SubmitButton from '../../../components/commons/SubmitButton';
import { PATH_WHOLESALES } from '../../../constants/pathConstants';
import { useSubmitHandler } from '../../../hooks/useHandler';
import { useAddWholesaleStore } from '../../../store/wholesale/useAddWholesaleStore';
import { IErrorResponse } from '../../../types/error';

const SubmitContainer: React.FC = () => {
    const session = useSession();
    const wholesale = useAddWholesaleStore((state) => state.wholesale);

    const {
        isLoading,
        mutate,
        isSuccess,
        error,
    } = useMutation(
        (data: { formData: FormData; userId: string; accessToken: string }) =>
            createWholesale(data.formData, data.userId, data.accessToken)
    );

    useSubmitHandler(
        isLoading,
        isSuccess,
        PATH_WHOLESALES,
        error as AxiosError<IErrorResponse>
    );

    const onSubmit = useCallback(() => {
        const accessToken = session.data?.user.accessToken;

        if (!accessToken) return;

        const selectedMainCategories = wholesale.mainCategories
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

        const selectedMiddleCategories = wholesale.mainCategories
            .flatMap((mainCategory) =>
                Array.isArray(mainCategory.middleCategories)
                    ? mainCategory.middleCategories
                    : []
            )
            .filter((middleCategory) => middleCategory.isSelect)
            .map((middleCategory) => ({ id: middleCategory.id }));

        let formData = new FormData();

        if (!wholesale.thumbnail) {
            alert('썸네일 이미지가 없습니다.');
            return;
        }

        if (!wholesale.imageFiles || wholesale.imageFiles.length <= 0) {
            alert('도소매 이미지가 없습니다.');
            return;
        }

        formData.append('thumbnail', wholesale.thumbnail.file!);

        for (let i = 0; i < wholesale.imageFiles.length; i++) {
            formData.append('images', wholesale.imageFiles[i].file!);
        }

        const tempWholesale = {
            address: wholesale.address,
            latitude: Math.floor(Math.random() * 900000) + 100000,
            longitude: Math.floor(Math.random() * 900000) + 100000,
            name: wholesale.name,
            storeName: wholesale.storeName,
            businessNumber: wholesale.businessNumber,
            marketId: wholesale.marketId,
            career: wholesale.career,
            profile: wholesale.profile,
            activate: wholesale.activate,
            content: wholesale.content,
            mainCategories: selectedMainCategories,
            middleCategories: selectedMiddleCategories,
        };

        formData.append(
            'wholesale',
            new Blob([JSON.stringify(tempWholesale)], {
                type: 'application/json',
            })
        );

        mutate({ formData, userId: wholesale.uuid, accessToken });
    }, [wholesale]);

    return <SubmitButton onSubmit={onSubmit} />;
};

export default SubmitContainer;
