import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import React, { useCallback } from 'react';
import { updateExpert } from '../../../api/experts';
import SubmitButton from '../../../components/commons/SubmitButton';
import { PATH_WHOLESALES } from '../../../constants/pathConstants';
import { useGetExpert } from '../../../hooks/useExperts';
import { useSubmitHandler } from '../../../hooks/useHandler';
import { useEditExpertStore } from '../../../store/expert/expertEditStore';
import { ICategory } from '../../../types/category';
import { IErrorResponse } from '../../../types/error';
import { IEditExpert } from '../../../types/expert';
import {
    getAddedItem,
    getDeletedItem,
    getDeleteImages,
} from '../../../utils/utils';

interface ISubmitContainer {
    expertId: string;
    userId: string;
}

const SubmitContainer: React.FC<ISubmitContainer> = ({ expertId, userId }) => {
    const session = useSession();
    const oldbie = useGetExpert(userId, expertId);
    const expert = useEditExpertStore((state) => state.expert);
    const {
        isLoading,
        isSuccess,
        mutate,
        error,
    } = useMutation(
        (data: {
            formData: FormData;
            userId: string;
            expertId: string;
            accessToken: string;
        }) =>
            updateExpert(
                data.formData,
                data.userId,
                data.expertId,
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

        if (!accessToken || !oldbie || !expert) return;

        let formData = new FormData();

        const tempExpert: Partial<IEditExpert> = {};

        if (oldbie.name !== expert.name) {
            //이름 변경
            tempExpert.name = expert?.name;
        }

        if (oldbie.businessNumber !== expert.businessNumber) {
            //사업자번호 변경
            tempExpert.businessNumber = expert.businessNumber;
        }

        if (oldbie.address !== expert.address) {
            //주소 변경
            tempExpert.address = expert.address;
        }

        if (oldbie.latitude !== expert.latitude) {
            //위도 변경
            tempExpert.latitude = expert.latitude;
        }

        if (oldbie.longitude !== expert.longitude) {
            // 경도 변경
            tempExpert.longitude = expert.longitude;
        }

        // if (oldbie.market.id !== expert.market.id) {
        //     // 마켓 변경
        //     tempExpert.marketId = expert.market.id;
        // }

        if (oldbie.career !== expert.career) {
            // 경력 변경
            tempExpert.career = expert.career;
        }

        if (oldbie.profile !== expert.profile) {
            // 약력 변경
            tempExpert.profile = expert.profile;
        }

        if (oldbie.activate !== expert.activate) {
            // 상태 변경
            tempExpert.activate = expert.activate;
        }

        if (oldbie.content !== expert.content) {
            // 컨텐츠 변경
            tempExpert.content = expert.content;
        }

        const deleteImages = getDeleteImages(
            oldbie.images ? oldbie.images : [],
            expert.images ? expert.images : []
        );

        if (deleteImages) {
            // 삭제한 이미지들
            tempExpert.deleteImages = deleteImages;
        }

        if (expert.thumbnailImageFile && expert.thumbnailImageFile.file) {
            // 썸네일 변경
            formData.append('thumbnail', expert.thumbnailImageFile.file);
        }

        if (expert.imageFiles && expert.imageFiles.length > 0) {
            // 이미지 변경
            expert.imageFiles.forEach((item) => {
                if (item && item.file) {
                    formData.append('images', item.file);
                }
            });
        }

        const oldbieAllMiddleCategories: any[] = [];
        const newbieAllMiddleCategories: any[] = [];

        const addedMainCategories = getAddedItem(
            oldbie.categories,
            expert.categories
        );
        const deletedMainCategories = getDeletedItem(
            oldbie.categories,
            expert.categories
        );

        oldbie.categories.forEach((item: ICategory) => {
            oldbieAllMiddleCategories.push(...item.middleCategories);
        });

        expert.categories.forEach((item: ICategory) => {
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
            tempExpert.addMainCategories = addedMainCategories;
        }

        if (deletedMainCategories) {
            tempExpert.deleteMainCategories = deletedMainCategories;
        }

        if (addedMiddleCategories) {
            tempExpert.addMiddleCategories = addedMiddleCategories;
        }

        if (deletedMiddleCategories) {
            tempExpert.deleteMiddleCategories = deletedMiddleCategories;
        }

        formData.append(
            'expert',
            new Blob([JSON.stringify(tempExpert)], {
                type: 'application/json',
            })
        );
        mutate({
            formData,
            userId: '2c9e81a9887979660188797a15d40000',
            expertId: oldbie.id,
            accessToken,
        });
        //카테고리 추가 삭제
    }, [oldbie, session, userId]);

    return <SubmitButton onSubmit={onSubmit} />;
};

export default SubmitContainer;
