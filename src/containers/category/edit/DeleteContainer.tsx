import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import React, { useCallback } from 'react';
import { deleteMainCategory } from '../../../api/categories';
import SubmitButton from '../../../components/commons/SubmitButton';
import { PATH_CATEGORIES } from '../../../constants/pathConstants';
import { useGetMainCategory } from '../../../hooks/useCategories';
import { useSubmitHandler } from '../../../hooks/useHandler';
import { IErrorResponse } from '../../../types/error';

interface IDeleteContainer {
    categoryId: string;
}

const DeleteContainer: React.FC<IDeleteContainer> = ({ categoryId }) => {
    const session = useSession();
    const category = useGetMainCategory(categoryId);
    const {
        mutate,
        isLoading,
        error,
        isSuccess,
    } = useMutation((data: { categoryId: string; accessToken: string }) =>
        deleteMainCategory(data.categoryId, data.accessToken)
    );

    useSubmitHandler(
        isLoading,
        isSuccess,
        PATH_CATEGORIES,
        error as AxiosError<IErrorResponse>
    );

    const middleCategories = category ? category.middleCategories : [];

    const onSubmit = useCallback(() => {
        const accessToken = session.data?.user.accessToken;

        if (category.activate) {
            alert(
                '카테고리의 상태가 활성화중입니다. 비활성화 후 다시 시도해주세요.'
            );
            return;
        }

        mutate({ categoryId, accessToken });
    }, [categoryId, category, middleCategories]);

    return (
        <SubmitButton color={'error'} onSubmit={onSubmit} label={'delete'} />
    );
};

export default DeleteContainer;
