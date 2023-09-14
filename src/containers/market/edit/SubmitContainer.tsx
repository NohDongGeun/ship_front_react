import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import React, { useCallback } from 'react';
import { updateMarket } from '../../../api/markets';
import SubmitButton from '../../../components/commons/SubmitButton';
import { PATH_MARKETS } from '../../../constants/pathConstants';
import { useSubmitHandler } from '../../../hooks/useHandler';
import { useGetMarket } from '../../../hooks/useMarkets';
import { useEditMarketStore } from '../../../store/market/marketEditStore';
import { ICategory } from '../../../types/category';
import { IErrorResponse } from '../../../types/error';
import { IMarketEdit } from '../../../types/market';
import {
    getAddedItem,
    getDeletedItem,
    getDeleteImages,
} from '../../../utils/utils';

interface ISubmitContainer {
    marketId: string;
}

const SubmitContainer: React.FC<ISubmitContainer> = ({ marketId }) => {
    const session = useSession();
    const market = useEditMarketStore((state) => state.market);
    const oldbie = useGetMarket(marketId);
    const {
        isLoading,
        isSuccess,
        mutate,
        error,
    } = useMutation(
        (data: { formData: FormData; marketId: string; accessToken: string }) =>
            updateMarket(data.formData, data.marketId, data.accessToken)
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
        let formData = new FormData();
        if (!market.thumbnail && !market.thumbnailImageFile) {
            alert('썸네일 이미지를 등록해주세요.');
            return;
        }

        if (market.images.length <= 0 && market.imageFiles.length <= 0) {
            alert('시장 이미지를 등록해주세요.');
            return;
        }

        if (market.thumbnailImageFile && market.thumbnailImageFile.file) {
            // 새로운 썸네일
            formData.append('thumbnail', market.thumbnailImageFile.file);
        }

        if (market.imageFiles.length > 0) {
            for (let i = 0; i < market.imageFiles.length; i++) {
                formData.append('images', market.imageFiles[i].file!);
            }
        }

        const tempMarket: Partial<IMarketEdit> = {};

        if (oldbie.name !== market.name) {
            // 이름 변경
            tempMarket.name = market.name;
        }

        if (oldbie.contents !== market.contents) {
            // 컨텐츠 변경
            tempMarket.contents = market.contents;
        }

        if (oldbie.address !== market.address) {
            // 주소 변경
            tempMarket.address = market.address;
        }

        if (oldbie.latitude !== market.latitude) {
            // 위도 변경
            tempMarket.latitude = market.latitude;
        }

        if (oldbie.longitude !== market.longitude) {
            // 경도 변경
            tempMarket.longitude = market.longitude;
        }

        if (oldbie.activate !== market.activate) {
            //활성화 변경
            tempMarket.activate = market.activate;
        }

        const deleteImages = getDeleteImages(oldbie.images, market.images);

        if (deleteImages) {
            tempMarket.deleteImages = deleteImages;
        }

        const addedMainCategories = getAddedItem(
            oldbie.categories,
            market.categories
        );
        const deletedMainCategories = getDeletedItem(
            oldbie.categories,
            market.categories
        );

        const oldbieAllMiddleCategories: any[] = [];
        const newbieAllMiddleCategories: any[] = [];

        oldbie.categories.forEach((item: ICategory) => {
            oldbieAllMiddleCategories.push(...item.middleCategories);
        });

        market.categories.forEach((item: ICategory) => {
            newbieAllMiddleCategories.push(...item.middleCategories);
        });

        const addedMiddleCategories = getAddedItem(
            oldbieAllMiddleCategories,
            newbieAllMiddleCategories
        );
        const deletedMiddleCategories = getDeletedItem(
            oldbieAllMiddleCategories,
            newbieAllMiddleCategories
        );

        if (addedMainCategories) {
            tempMarket.addMainCategories = addedMainCategories;
        }

        if (deletedMainCategories) {
            tempMarket.deleteMainCategories = deletedMainCategories;
        }

        if (addedMiddleCategories) {
            tempMarket.addMiddleCategories = addedMiddleCategories;
        }

        if (deletedMiddleCategories) {
            tempMarket.deleteMiddleCategories = deletedMiddleCategories;
        }

        formData.append(
            'market',
            new Blob([JSON.stringify(tempMarket)], {
                type: 'application/json',
            })
        );
        mutate({ formData, marketId: `${market.id}`, accessToken });
    }, [market, oldbie, session]);

    return <SubmitButton onSubmit={onSubmit} />;
};

export default SubmitContainer;
