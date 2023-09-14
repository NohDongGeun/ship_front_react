import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import React, { useCallback } from 'react';
import { updateWholesale } from '../../../api/wholesales';
import { IImage } from '../../../components/commons/MultiImageUpload';
import SubmitButton from '../../../components/commons/SubmitButton';
import { PATH_WHOLESALES } from '../../../constants/pathConstants';
import { useSubmitHandler } from '../../../hooks/useHandler';
import { useGetWholesale } from '../../../hooks/useWholesales';
import { useEditWholesaleStore } from '../../../store/wholesale/useEditWholesaleStore';
import { ICategory } from '../../../types/category';
import { IErrorResponse } from '../../../types/error';
import { IWholesaleEdit } from '../../../types/wholesale';
import {
    getAddedItem,
    getDeletedItem,
    getDeleteImages,
} from '../../../utils/utils';

interface ISubmitContainer {
    wholesaleId: string;
    userId: string;
}

const SubmitContainer: React.FC<ISubmitContainer> = ({
    wholesaleId,
    userId,
}) => {
    const session = useSession();
    const oldbie = useGetWholesale(wholesaleId);

    const wholesale = useEditWholesaleStore((state) => state.wholesale);
    const {
        isLoading,
        isSuccess,
        mutate,
        error,
    } = useMutation(
        (data: {
            formData: FormData;
            userId: string;
            wholesaleId: string;
            accessToken: string;
        }) =>
            updateWholesale(
                data.formData,
                data.userId,
                data.wholesaleId,
                data.accessToken
            )
    );

    useSubmitHandler(
        isLoading,
        isSuccess,
        PATH_WHOLESALES,
        error as AxiosError<IErrorResponse>
    );

    const onSubmit = useCallback(() => {
        const accessToken = session.data?.user.accessToken;

        if (!accessToken || !oldbie || !wholesale) return;

        let formData = new FormData();
        let tempWholesale: Partial<IWholesaleEdit> = {};

        if (oldbie.name !== wholesale.name) {
            // 이름 변경
            tempWholesale.name = wholesale.name;
        }

        if (oldbie.storeName !== wholesale?.storeName) {
            // 상점 이름 변경
            tempWholesale.storeName = wholesale.storeName;
        }

        if (oldbie.businessNumber !== wholesale?.businessNumber) {
            // 사업자 번호 변경
            tempWholesale.businessNumber = wholesale.businessNumber;
        }

        if (oldbie.address !== wholesale?.address) {
            // 주소 변경
            tempWholesale.address = wholesale.address;
        }

        if (oldbie.latitude !== wholesale.latitude) {
            // 위도 변경
            tempWholesale.latitude = wholesale.latitude;
        }

        if (oldbie.longitude !== wholesale.longitude) {
            //경도 변경
            tempWholesale.longitude = wholesale.longitude;
        }

        if (oldbie.market.id !== wholesale.market.id) {
            // 시장 변경
            tempWholesale.marketId = wholesale.market.id;
        }

        if (oldbie.career !== wholesale.career) {
            // 경력 변경
            tempWholesale.career = wholesale.career;
        }

        if (oldbie.profile !== wholesale.profile) {
            // 약력 변경
            tempWholesale.profile = wholesale.profile;
        }

        if (oldbie.activate !== wholesale.activate) {
            // 상태 변경
            tempWholesale.activate = wholesale.activate;
        }

        if (oldbie.content !== wholesale.content) {
            //컨텐츠 변경
            tempWholesale.content = wholesale.content;
        }

        if (wholesale.thumbnailImageFile && wholesale.thumbnailImageFile.file) {
            // 썸네일 변경
            formData.append('thumbnail', wholesale.thumbnailImageFile.file);
        }

        if (wholesale.imageFiles) {
            wholesale.imageFiles.forEach((item: IImage) => {
                formData.append('images', item.file!);
            });
        }
        const deleteImages = getDeleteImages(oldbie.images, wholesale.images);

        if (deleteImages) {
            tempWholesale.deleteImages = deleteImages;
        }

        const addedMainCategories = getAddedItem(
            oldbie.categories,
            wholesale.categories
        );
        const deletedMainCategories = getDeletedItem(
            oldbie.categories,
            wholesale.categories
        );

        const oldbieAllMiddleCategories: any[] = [];
        const newbieAllMiddleCategories: any[] = [];

        oldbie.categories.forEach((item: ICategory) => {
            oldbieAllMiddleCategories.push(...item.middleCategories);
        });

        wholesale.categories.forEach((item: ICategory) => {
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
            tempWholesale.addMainCategories = addedMainCategories;
        }

        if (deletedMainCategories) {
            tempWholesale.deleteMainCategories = deletedMainCategories;
        }

        if (addedMiddleCategories) {
            tempWholesale.addMiddleCategories = addedMiddleCategories;
        }

        if (deletedMiddleCategories) {
            tempWholesale.deleteMiddleCategories = deletedMiddleCategories;
        }

        formData.append(
            'wholesaler',
            new Blob([JSON.stringify(tempWholesale)], {
                type: 'application/json',
            })
        );

        mutate({ formData, userId, wholesaleId: oldbie.id, accessToken });
    }, [wholesale, oldbie, session, userId]);

    return <SubmitButton onSubmit={onSubmit} />;
};

export default SubmitContainer;
