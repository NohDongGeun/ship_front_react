import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import React, { useCallback } from 'react';
import { createCommunity } from '../../../api/communities';
import SubmitButton from '../../../components/commons/SubmitButton';
import { PATH_COMMUNITIES } from '../../../constants/pathConstants';
import { useSubmitHandler } from '../../../hooks/useHandler';
import { useAddCommunityStore } from '../../../store/community/communitiesAddStore';
import { IErrorResponse } from '../../../types/error';

const SubmitContainer: React.FC = () => {
    const session = useSession();
    const community = useAddCommunityStore((state) => state.community);

    const {
        isLoading,
        isSuccess,
        mutate,
        error,
    } = useMutation((data: { data: any; accessToken: string }) =>
        createCommunity(data.data, data.accessToken)
    );

    useSubmitHandler(
        isLoading,
        isSuccess,
        PATH_COMMUNITIES,
        error as AxiosError<IErrorResponse>
    );

    const onSubmit = useCallback(() => {
        const accessToken = session.data?.user.accessToken;

        if (!accessToken) return;

        if (!community.title) {
            alert('제목을 입력해주세요.');
            return;
        }

        if (!community.content) {
            alert('컨텐츠를 입력해주세요.');
            return;
        }

        if (!community.communityCategory) {
            alert('커뮤니티 카테고리를 선택해주세요.');
            return;
        }

        const tempCommunity = {
            authorUUID: community.authorUUID,
            title: community.title,
            status: community.status,
            content: community.content,
            activate: community.activate,
            images: community.images,
            comments: community.comments,
            communityCategoryId: community.communityCategory.id,
        };

        mutate({ data: tempCommunity, accessToken });
    }, [community]);

    return <SubmitButton onSubmit={onSubmit} />;
};

export default SubmitContainer;
