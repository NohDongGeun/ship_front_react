import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import React, { useCallback } from 'react';
import { deleteCommunity } from '../../../api/communities';
import SubmitButton from '../../../components/commons/SubmitButton';
import { PATH_COMMUNITIES } from '../../../constants/pathConstants';
import { useGetCommunities } from '../../../hooks/useCommunities';
import { useSubmitHandler } from '../../../hooks/useHandler';
import { useGetMarket } from '../../../hooks/useMarkets';
import { IErrorResponse } from '../../../types/error';

interface IDeleteContainer {
    communityId: string;
}

const DeleteContainer: React.FC<IDeleteContainer> = ({ communityId }) => {
    const session = useSession();
    const community = useGetCommunities(communityId);
    const {
        mutate,
        isLoading,
        error,
        isSuccess,
    } = useMutation((data: { communityId: string; accessToken: string }) =>
        deleteCommunity(data.communityId, data.accessToken)
    );

    useSubmitHandler(
        isLoading,
        isSuccess,
        PATH_COMMUNITIES,
        error as AxiosError<IErrorResponse>
    );

    const onSubmit = useCallback(() => {
        if (!community) return;
        const accessToken = session.data?.user.accessToken;

        if (community.activate) {
            alert(
                '커뮤니티의 상태가 활성화중입니다. 비활성화 후 다시 시도해주세요.'
            );
            return;
        }

        mutate({ communityId, accessToken });
    }, [communityId, community]);

    return (
        <SubmitButton color={'error'} onSubmit={onSubmit} label={'delete'} />
    );
};

export default React.memo(DeleteContainer);
