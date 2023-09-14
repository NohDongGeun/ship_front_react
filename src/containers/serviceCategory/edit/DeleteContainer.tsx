import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import React, { useCallback } from 'react';
import { deleteServiceCategory } from '../../../api/serviceCategories';
import SubmitButton from '../../../components/commons/SubmitButton';
import { PATH_SERVICE_CATEGORIES } from '../../../constants/pathConstants';
import { useSubmitHandler } from '../../../hooks/useHandler';
import { useGetServiceCategory } from '../../../hooks/useServiceCategories';
import { IErrorResponse } from '../../../types/error';

interface IDeleteContainer {
    categoryId: string;
}

const DeleteContainer: React.FC<IDeleteContainer> = ({ categoryId }) => {
    const session = useSession();
    const {
        isLoading,
        isSuccess,
        mutate,
        error,
    } = useMutation((data: { categoryId: string; accessToken: string }) =>
        deleteServiceCategory(data.categoryId, data.accessToken)
    );

    useSubmitHandler(
        isLoading,
        isSuccess,
        PATH_SERVICE_CATEGORIES,
        error as AxiosError<IErrorResponse>
    );

    const serviceCategory = useGetServiceCategory(categoryId);

    const onSubmit = useCallback(() => {
        if (!serviceCategory) return;

        if (serviceCategory.activate) {
            alert(
                '해당 카테고리는 활성화 되어 있습니다. 비활성화 후 삭제해주세요.'
            );
            return;
        }
        const accessToken = session.data?.user.accessToken;

        mutate({ categoryId, accessToken });
    }, [categoryId, session, serviceCategory]);

    return (
        <SubmitButton color={'error'} onSubmit={onSubmit} label={'delete'} />
    );
};

export default React.memo(DeleteContainer);
