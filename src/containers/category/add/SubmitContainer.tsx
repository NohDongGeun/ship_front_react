import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import React, { useCallback } from 'react';
import { createMainCategory } from '../../../api/categories';
import SubmitButton from '../../../components/commons/SubmitButton';
import { PATH_CATEGORIES } from '../../../constants/pathConstants';
import { useSubmitHandler } from '../../../hooks/useHandler';
import { useAddCategoryStore } from '../../../store/mainCategory/categoryAddStore';
import { IErrorResponse } from '../../../types/error';

const SubmitContainer: React.FC = () => {
    const session = useSession();
    const {
        mutate,
        isLoading,
        error,
        isSuccess,
    } = useMutation((data: { formData: FormData; accessToken: string }) =>
        createMainCategory(data.formData, data.accessToken)
    );

    useSubmitHandler(
        isLoading,
        isSuccess,
        PATH_CATEGORIES,
        error as AxiosError<IErrorResponse>
    );

    const category = useAddCategoryStore((state) => state.category);

    const onSubmit = useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            const accessToken = session.data?.user.accessToken;

            if (!accessToken) {
                return;
            }

            const obj = {
                name: category.name,
                activate: category.activate,
                middleCategories: category.middleCategories,
            };

            let formData = new FormData();

            if (category.imageFile && category.imageFile.file) {
                formData.append('image', category.imageFile.file);
                formData.append(
                    'maincategory',
                    new Blob([JSON.stringify(obj)], {
                        type: 'application/json',
                    })
                );
            }

            mutate({ formData, accessToken });
        },
        [category, session]
    );

    return <SubmitButton onSubmit={onSubmit} />;
};

export default SubmitContainer;
