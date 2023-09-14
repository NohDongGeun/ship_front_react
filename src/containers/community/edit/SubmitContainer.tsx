import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import React, { useCallback } from 'react';
import { updateCommunity } from '../../../api/communities';
import SubmitButton from '../../../components/commons/SubmitButton';
import { PATH_COMMUNITIES } from '../../../constants/pathConstants';
import { useGetCommunity } from '../../../hooks/useCommunities';
import { useSubmitHandler } from '../../../hooks/useHandler';
import { useEditCommunityStore } from '../../../store/community/communityEditStore';
import { IEditCommunity } from '../../../types/community';
import { IErrorResponse } from '../../../types/error';

interface ISubmitContainer {
    communityId: string;
}

const SubmitContainer: React.FC<ISubmitContainer> = ({ communityId }) => {
    const session = useSession();
    const community = useEditCommunityStore((state) => state.community);
    const oldbie = useGetCommunity(communityId);
    const {
        isLoading,
        isSuccess,
        mutate,
        error,
    } = useMutation(
        (data: { data: any; communityId: string; accessToken: string }) =>
            updateCommunity(data.data, data.communityId, data.accessToken)
    );

    useSubmitHandler(
        isLoading,
        isSuccess,
        PATH_COMMUNITIES,
        error as AxiosError<IErrorResponse>
    );

    const onSubmit = useCallback(() => {
        const accessToken = session.data?.user.accessToken;

        if (!accessToken || !oldbie) return;

        if (!community?.title) {
            alert('제목을 입력해주세요.');
            return;
        }

        if (!community.content) {
            alert('컨텐츠를 입력해주세요.');
            return;
        }

        if (!community.category) {
            alert('커뮤니티 카테고리를 선택해주세요.');
            return;
        }

        let tempCommunity: Partial<IEditCommunity> = {
            // authorUUID: community.authorUUID,
            // title: community.title,
            // status: community.status,
            // content: community.content,
            // activate: community.activate,
            // images: community.images,
            // comments: community.comments,
            // communityCategoryId: community.communityCategory.id,
        };

        if (oldbie.title !== community.title) {
            // 제목 수정
            tempCommunity.title = community.title;
        }

        if (oldbie.status !== community.status) {
            // 커뮤니티 상태 수정
            tempCommunity.status = community.status;
        }

        if (oldbie.activate !== community.activate) {
            // 상태 수정
            tempCommunity.activate = community.activate;
        }

        if (oldbie.content !== community.content) {
            // 컨텐츠 수정
            tempCommunity.content = community.content;
        }

        if (oldbie.category.id !== community.category.id) {
            // 커뮤니티 카테고리 변경
            tempCommunity.communityCategoryId = community.category.id;
        }

        mutate({
            data: tempCommunity,
            communityId: `${community.id}`,
            accessToken,
        });
    }, [oldbie, community]);

    return <SubmitButton onSubmit={onSubmit} />;
};

export default SubmitContainer;
