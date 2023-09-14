import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import React, { useCallback } from 'react';
import { createMarket } from '../../../api/markets';
import SubmitButton from '../../../components/commons/SubmitButton';
import { PATH_MARKETS } from '../../../constants/pathConstants';
import { useSubmitHandler } from '../../../hooks/useHandler';
import { useAddMarketStore } from '../../../store/market/marketAddStore';
import { IErrorResponse } from '../../../types/error';

const SubmitContainer: React.FC = () => {
    const session = useSession();
    const market = useAddMarketStore((state) => state.market);

    const {
        isLoading,
        isSuccess,
        mutate,
        error,
    } = useMutation((data: { formData: FormData; accessToken: string }) =>
        createMarket(data.formData, data.accessToken)
    );

    useSubmitHandler(
        isLoading,
        isSuccess,
        PATH_MARKETS,
        error as AxiosError<IErrorResponse>
    );

    const onSubmit = useCallback(() => {
        const accessToken = session.data?.user.accessToken;

        if (!accessToken) return;

        const selectedMainCategories = market.mainCategories
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
        const selectedMiddleCategories = market.mainCategories
            .flatMap((mainCategory) =>
                Array.isArray(mainCategory.middleCategories)
                    ? mainCategory.middleCategories
                    : []
            ) // Array.isArray를 사용하여 middleCategories가 배열인지 확인합니다.
            .filter((middleCategory) => middleCategory.isSelect) // isSelect가 true인 중간 카테고리만 필터링합니다.
            .map((middleCategory) => ({ id: middleCategory.id })); // 각 중간 카테고리를 { id: middleCategoryId } 형태의 객체로 변환합니다.
        let formData = new FormData();

        if (!market.thumbnail || !market.thumbnail.file) {
            alert('썸네일 이미지를 등록해주세요.');
            return;
        }

        if (!market.imageFiles || market.imageFiles.length <= 0) {
            // 이미지 없음
            alert('이미지를 등록해주세요.');
            return;
        }

        formData.append('thumbnail', market.thumbnail.file);

        for (let i = 0; i < market.imageFiles.length; i++) {
            formData.append('images', market.imageFiles[i].file!);
        }

        const tempMarket = {
            address: market.address,
            latitude: Math.floor(Math.random() * 900000) + 100000,
            longitude: Math.floor(Math.random() * 900000) + 100000,
            name: market.name,
            activate: market.activate,
            content: market.contents,
            mainCategories: selectedMainCategories,
            middleCategories: selectedMiddleCategories,
        };

        formData.append(
            'market',
            new Blob([JSON.stringify(tempMarket)], {
                type: 'application/json',
            })
        );
        mutate({ formData, accessToken });
    }, [market]);

    return <SubmitButton onSubmit={onSubmit} />;
};

export default SubmitContainer;
