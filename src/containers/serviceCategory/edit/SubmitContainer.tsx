import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import React, { useCallback } from 'react';
import { updateServiceCategory } from '../../../api/serviceCategories';
import SubmitButton from '../../../components/commons/SubmitButton';
import { PATH_SERVICE_CATEGORIES } from '../../../constants/pathConstants';
import { useSubmitHandler } from '../../../hooks/useHandler';
import { useGetServiceCategory } from '../../../hooks/useServiceCategories';
import { useEditServiceCategoryStore } from '../../../store/serviceCategory/serviceCategoryEditStore';
import { IErrorResponse } from '../../../types/error';
import { ICreateServiceCategory } from '../../../types/serviceCategory';

interface ISubmitContainer {
    categoryId: string;
}

const SubmitContainer: React.FC<ISubmitContainer> = ({ categoryId }) => {
    const session = useSession();
    const {
        mutate,
        isLoading,
        isSuccess,
        error,
    } = useMutation(
        (data: {
            serviceCategory: Partial<ICreateServiceCategory>;
            categoryId: string;
            accessToken: string;
        }) =>
            updateServiceCategory(
                data.serviceCategory,
                data.categoryId,
                data.accessToken
            )
    );

    useSubmitHandler(
        isLoading,
        isSuccess,
        PATH_SERVICE_CATEGORIES,
        error as AxiosError<IErrorResponse>
    );

    const oldbieServiceCategory = useGetServiceCategory(categoryId);

    const serviceCategory = useEditServiceCategoryStore(
        (state) => state.serviceCategory
    );

    const onSubmit = useCallback(() => {
        if (!serviceCategory) {
            return;
        }

        const accessToken = session.data?.user.accessToken;

        if (!accessToken || !oldbieServiceCategory || !serviceCategory) return;

        const updateServiceCategory: Partial<ICreateServiceCategory> = {};

        if (oldbieServiceCategory.name !== serviceCategory.name) {
            updateServiceCategory.name = serviceCategory.name;
        }

        if (oldbieServiceCategory.activate !== serviceCategory.activate) {
            updateServiceCategory.activate = serviceCategory.activate;
        }

        mutate({
            serviceCategory: updateServiceCategory,
            categoryId,
            accessToken,
        });
    }, [oldbieServiceCategory, serviceCategory, session, categoryId]);

    return <SubmitButton onSubmit={onSubmit} />;
};

export default SubmitContainer;
