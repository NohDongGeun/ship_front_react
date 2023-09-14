import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import React, { useCallback } from 'react';
import { deleteQna } from '../../../api/qnas';
import SubmitButton from '../../../components/commons/SubmitButton';
import { PATH_COMMUNITIES } from '../../../constants/pathConstants';
import { useSubmitHandler } from '../../../hooks/useHandler';
import { useGetQna } from '../../../hooks/useQnas';
import { IErrorResponse } from '../../../types/error';

interface IDeleteContainer {
    qnaId: string;
}

const DeleteContainer: React.FC<IDeleteContainer> = ({ qnaId }) => {
    const session = useSession();
    const qna = useGetQna(qnaId);
    const {
        mutate,
        isLoading,
        error,
        isSuccess,
    } = useMutation((data: { qnaId: string; accessToken: string }) =>
        deleteQna(data.qnaId, data.accessToken)
    );

    useSubmitHandler(
        isLoading,
        isSuccess,
        PATH_COMMUNITIES,
        error as AxiosError<IErrorResponse>
    );

    const onSubmit = useCallback(() => {
        if (!qna) return;
        const accessToken = session.data?.user.accessToken;

        if (qna.activate) {
            alert(
                'QNA의 상태가 활성화중입니다. 비활성화 후 다시 시도해주세요.'
            );
            return;
        }

        mutate({ qnaId, accessToken });
    }, [qnaId, qna]);

    return (
        <SubmitButton color={'error'} onSubmit={onSubmit} label={'delete'} />
    );
};

export default React.memo(DeleteContainer);
