import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import React, { useCallback } from 'react';
import { updateMainCategory } from '../../../api/categories';
import SubmitButton from '../../../components/commons/SubmitButton';
import { PATH_CATEGORIES } from '../../../constants/pathConstants';
import { useGetMainCategory } from '../../../hooks/useCategories';
import { useSubmitHandler } from '../../../hooks/useHandler';
import { useEditCategoryStore } from '../../../store/mainCategory/categoryEditStore';
import { IMiddleCategory } from '../../../types/category';
import { IErrorResponse } from '../../../types/error';

interface ISubmitContainer {
    categoryId: string;
}

interface IIdArray {
    id: number;
}

interface IAddMiddleCategory {
    name: string;
    activate: boolean;
}

interface INewbieCategory {
    name?: string;
    activate?: boolean;
    addMiddleCategories?: IAddMiddleCategory[];
    deleteMiddleCategories?: IIdArray[];
    editMiddleCategories?: IMiddleCategory[];
}

const SubmitContainer: React.FC<ISubmitContainer> = ({ categoryId }) => {
    const session = useSession();
    const oldbieCategory = useGetMainCategory(categoryId);
    const {
        mutate,
        isLoading,
        isSuccess,
        error,
    } = useMutation(
        (data: {
            formData: FormData;
            categoryId: string;
            accessToken: string;
        }) =>
            updateMainCategory(data.formData, data.categoryId, data.accessToken)
    );

    useSubmitHandler(
        isLoading,
        isSuccess,
        PATH_CATEGORIES,
        error as AxiosError<IErrorResponse>
    );

    const category = useEditCategoryStore((state) => state.category);
    const middleCategories = useEditCategoryStore(
        (state) => state.category.middleCategories
    );

    function getChangedValues(
        oldbie: IMiddleCategory[],
        newbie: IMiddleCategory[]
    ): IMiddleCategory[] {
        let changes: IMiddleCategory[] = [];

        for (let newCategory of newbie) {
            let oldCategory = oldbie.find(
                (category) => category.id === newCategory.id
            );

            if (oldCategory) {
                let change: Record<string, any> = { id: newCategory.id };

                for (let key in newCategory) {
                    if (
                        oldCategory[key as keyof IMiddleCategory] !==
                        newCategory[key as keyof IMiddleCategory]
                    ) {
                        change[key] = newCategory[key as keyof IMiddleCategory]; // Use value from 'newbie'
                    }
                }

                if (Object.keys(change).length > 1) {
                    changes.push(change as IMiddleCategory);
                }
            }
        }

        return changes;
    }

    function getMissingValues(
        oldbie: IMiddleCategory[],
        newbie: IMiddleCategory[]
    ): { id: number }[] {
        return oldbie
            .filter(
                (oldCategory) =>
                    !newbie.some(
                        (newCategory) => newCategory.id === oldCategory.id
                    )
            )
            .map((oldCategory) => ({ id: oldCategory.id as number })); // Extract 'id' from missing elements
    }

    const onSubmit = useCallback(() => {
        const oldbieMiddleCategories = oldbieCategory.middleCategories;
        const accessToken = session.data?.user.accessToken;

        // 새로 추가 할 미들 카테고리 배열
        const addMiddleCategories = middleCategories
            .filter((item) => !item.id || item.id === 0)
            .map((item) => ({ name: item.name, activate: item.activate }));

        // 이전에 존재했던 미들 카테고리 배열
        const existIdMiddleCategories = middleCategories.filter(
            (item) => item.id && item.id > 0
        );

        // 이전에 존재했던 미들 카테고리 중 변경사항이 있는 미들 카테고리 목록
        const editMiddleCategories = getChangedValues(
            oldbieMiddleCategories,
            existIdMiddleCategories
        );

        // 이전에 존재했던 미들 카테고리 중 삭제 할 미들 카테고리 목록
        const deleteMiddleCategories = getMissingValues(
            oldbieMiddleCategories,
            existIdMiddleCategories
        );

        let formData = new FormData();
        let isChanged = false;

        let newbieCategory: INewbieCategory = {};

        if (addMiddleCategories && addMiddleCategories.length > 0) {
            newbieCategory.addMiddleCategories = addMiddleCategories;
            isChanged = true;
        }

        if (editMiddleCategories && editMiddleCategories.length > 0) {
            newbieCategory.editMiddleCategories = editMiddleCategories;
            isChanged = true;
        }

        if (deleteMiddleCategories && deleteMiddleCategories.length > 0) {
            newbieCategory.deleteMiddleCategories = deleteMiddleCategories;
            isChanged = true;
        }

        if (oldbieCategory.name !== category.name) {
            // 이름변경
            newbieCategory!.name = category.name;
            isChanged = true;
        }

        if (oldbieCategory.activate !== category.activate) {
            // 상태변경
            newbieCategory.activate = category.activate;
            isChanged = true;
        }

        if (category.imageFile && category.imageFile.file) {
            // 이미지 변경
            formData.append('image', category.imageFile.file);
            isChanged = true;
        }

        formData.append(
            'maincategory',
            new Blob([JSON.stringify(newbieCategory)], {
                type: 'application/json',
            })
        );

        if (isChanged) {
            mutate({ formData, categoryId, accessToken });
        }
    }, [oldbieCategory, category, categoryId, middleCategories]);

    return <SubmitButton onSubmit={onSubmit} />;
};

export default SubmitContainer;
