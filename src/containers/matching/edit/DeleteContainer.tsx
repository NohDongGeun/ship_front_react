import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import React, { useCallback } from 'react';
import { deleteMatching } from '../../../api/matchings';
import SubmitButton from '../../../components/commons/SubmitButton';
import { PATH_MATCHINGS } from '../../../constants/pathConstants';
import { useSubmitHandler } from '../../../hooks/useHandler';
import { useGetMatching } from '../../../hooks/useMatchings';
import { IErrorResponse } from '../../../types/error';

interface IDeleteContainer {
    matchingId: string;
}

const DeleteContainer: React.FC<IDeleteContainer> = ({ matchingId }) => {
    const session = useSession();
    const {
        mutate,
        isLoading,
        error,
        isSuccess,
    } = useMutation((data: { matchingId: string; accessToken: string }) =>
        deleteMatching(data.matchingId, data.accessToken)
    );

    useSubmitHandler(
        isLoading,
        isSuccess,
        PATH_MATCHINGS,
        error as AxiosError<IErrorResponse>
    );

    const matching = useGetMatching(matchingId);

    const onSubmit = useCallback(() => {
        if (!matching) return;

        if (matching.activate) {
            alert(
                '해당 카테고리는 활성화 되어 있습니다. 비활성화 후 삭제해주세요.'
            );
            return;
        }
        const accessToken = session.data?.user.accessToken;

        mutate({ matchingId, accessToken });
    }, [matchingId, session, matching]);

    return (
        <SubmitButton color={'error'} onSubmit={onSubmit} label={'delete'} />
    );
};

export default React.memo(DeleteContainer);
