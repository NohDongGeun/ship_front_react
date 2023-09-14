import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import React, { useCallback } from 'react';
import { updateCommunityCategory } from '../../../api/communityCategories';
import SubmitButton from '../../../components/commons/SubmitButton';
import { PATH_COMMUNITY_CATEGORIES } from '../../../constants/pathConstants';
import { useGetCommunityCategory } from '../../../hooks/useCommunityCategories';
import { useSubmitHandler } from '../../../hooks/useHandler';
import { useEditCommunityCategoryStore } from '../../../store/communityCategory/communityCategoryEditStore';
import { ICreateCommunityCategory } from '../../../types/communityCategory';
import { IErrorResponse } from '../../../types/error';

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
            communityCategory: Partial<ICreateCommunityCategory>;
            categoryId: string;
            accessToken: string;
        }) =>
            updateCommunityCategory(
                data.communityCategory,
                data.categoryId,
                data.accessToken
            )
    );

    useSubmitHandler(
        isLoading,
        isSuccess,
        PATH_COMMUNITY_CATEGORIES,
        error as AxiosError<IErrorResponse>
    );

    const oldbie = useGetCommunityCategory(categoryId);

    const communityCategory = useEditCommunityCategoryStore(
        (state) => state.communityCategory
    );

    const onSubmit = useCallback(() => {
        if (!communityCategory) {
            return;
        }

        const accessToken = session.data?.user.accessToken;

        if (!accessToken || !oldbie || !communityCategory) return;

        const updateCommunityCategory: Partial<ICreateCommunityCategory> = {};

        if (oldbie.name !== communityCategory.name) {
            updateCommunityCategory.name = communityCategory.name;
        }

        if (oldbie.activate !== communityCategory.activate) {
            updateCommunityCategory.activate = communityCategory.activate;
        }

        mutate({
            communityCategory: updateCommunityCategory,
            categoryId,
            accessToken,
        });
    }, [oldbie, communityCategory, session, categoryId]);

    return <SubmitButton onSubmit={onSubmit} />;
};

export default SubmitContainer;
