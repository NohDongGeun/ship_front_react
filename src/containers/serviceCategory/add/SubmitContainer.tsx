import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import React, { useCallback } from 'react';
import { createServiceCategory } from '../../../api/serviceCategories';
import SubmitButton from '../../../components/commons/SubmitButton';
import { PATH_SERVICE_CATEGORIES } from '../../../constants/pathConstants';
import { useSubmitHandler } from '../../../hooks/useHandler';
import { useAddServiceCategoryStore } from '../../../store/serviceCategory/serviceCategoryAddStore';
import { IErrorResponse } from '../../../types/error';
import { ICreateServiceCategory } from '../../../types/serviceCategory';

const SubmitContainer: React.FC = () => {
    const session = useSession();
    const {
        mutate,
        isLoading,
        isSuccess,
        error,
    } = useMutation(
        (data: {
            serviceCategory: ICreateServiceCategory;
            accessToken: string;
        }) => createServiceCategory(data.serviceCategory, data.accessToken)
    );

    useSubmitHandler(
        isLoading,
        isSuccess,
        PATH_SERVICE_CATEGORIES,
        error as AxiosError<IErrorResponse>
    );

    const serviceCategory = useAddServiceCategoryStore(
        (state) => state.serviceCategory
    );

    const onSubmit = useCallback(() => {
        if (!serviceCategory) {
            return;
        }

        const accessToken = session.data?.user.accessToken;

        if (!accessToken) return;

        const validateUser = (user: ICreateServiceCategory): boolean => {
            for (let key in user) {
                if (
                    user[key as keyof ICreateServiceCategory] === '' ||
                    user[key as keyof ICreateServiceCategory] === null ||
                    user[key as keyof ICreateServiceCategory] === undefined
                ) {
                    return false;
                }
            }
            return true;
        };

        if (!validateUser(serviceCategory)) {
            alert('잘못된 입력입니다. 다시 입력해주세요.');
            return;
        }

        mutate({ serviceCategory, accessToken });
    }, [serviceCategory, session]);

    return <SubmitButton onSubmit={onSubmit} />;
};

export default SubmitContainer;
