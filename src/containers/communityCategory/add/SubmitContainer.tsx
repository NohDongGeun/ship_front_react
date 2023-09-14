import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import React, { useCallback } from 'react';
import { createCommunityCategory } from '../../../api/communityCategories';
import SubmitButton from '../../../components/commons/SubmitButton';
import { PATH_COMMUNITY_CATEGORIES } from '../../../constants/pathConstants';
import { useSubmitHandler } from '../../../hooks/useHandler';
import { useAddCommunityCategoryStore } from '../../../store/communityCategory/communityCategoryAddStore';
import { ICreateCommunityCategory } from '../../../types/communityCategory';
import { IErrorResponse } from '../../../types/error';

const SubmitContainer: React.FC = () => {
    const session = useSession();
    const {
        mutate,
        isLoading,
        isSuccess,
        error,
    } = useMutation(
        (data: {
            communityCategory: ICreateCommunityCategory;
            accessToken: string;
        }) => createCommunityCategory(data.communityCategory, data.accessToken)
    );

    useSubmitHandler(
        isLoading,
        isSuccess,
        PATH_COMMUNITY_CATEGORIES,
        error as AxiosError<IErrorResponse>
    );

    const communityCategory = useAddCommunityCategoryStore(
        (state) => state.communityCategory
    );

    const onSubmit = useCallback(() => {
        if (!communityCategory) {
            return;
        }

        const accessToken = session.data?.user.accessToken;

        if (!accessToken) return;

        const validate = (user: ICreateCommunityCategory): boolean => {
            for (let key in user) {
                if (
                    user[key as keyof ICreateCommunityCategory] === '' ||
                    user[key as keyof ICreateCommunityCategory] === null ||
                    user[key as keyof ICreateCommunityCategory] === undefined
                ) {
                    return false;
                }
            }
            return true;
        };

        if (!validate(communityCategory)) {
            alert('잘못된 입력입니다. 다시 입력해주세요.');
            return;
        }

        mutate({ communityCategory, accessToken });
    }, [communityCategory, session]);

    return <SubmitButton onSubmit={onSubmit} />;
};

export default SubmitContainer;
