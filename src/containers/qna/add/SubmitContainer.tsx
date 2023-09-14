import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import React, { useCallback } from 'react';
import { createQna } from '../../../api/qnas';
import SubmitButton from '../../../components/commons/SubmitButton';
import { PATH_QNAS } from '../../../constants/pathConstants';
import { useSubmitHandler } from '../../../hooks/useHandler';
import { useAddQnaStore } from '../../../store/qna/qnaAddStore';
import { IErrorResponse } from '../../../types/error';
import { ICreateQna } from '../../../types/qna';

const SubmitContainer: React.FC = () => {
    const session = useSession();
    const qna = useAddQnaStore((state) => state.qna);

    const {
        isLoading,
        isSuccess,
        mutate,
        error,
    } = useMutation(
        (data: { data: Partial<ICreateQna>; accessToken: string }) =>
            createQna(data.data, data.accessToken)
    );

    useSubmitHandler(
        isLoading,
        isSuccess,
        PATH_QNAS,
        error as AxiosError<IErrorResponse>
    );

    const onSubmit = useCallback(() => {
        const accessToken = session.data?.user.accessToken;

        if (!accessToken || !qna) return;

        if (!qna.authorUUID) {
            alert('작성자 정보가 없습니다.');
            return;
        }

        if (!qna.title) {
            alert('제목 정보가 없습니다.');
            return;
        }

        if (!qna.content) {
            alert('컨텐츠 정보가 없습니다.');
            return;
        }

        if (!qna.serviceCategory) {
            alert('서비스 카테고리 정보가 없습니다.');
            return;
        }
        const tempQna: Partial<ICreateQna> = {
            authorUUID: qna.authorUUID,
            title: qna.title,
            content: qna.content,
            serviceCategoryId: qna.serviceCategory.id,
            images: qna.images,
            comments: qna.comments,
            activate: qna.activate,
            qnaStatus: qna.qnaStatus,
        };
        mutate({ data: tempQna, accessToken });
    }, [qna, session]);

    return <SubmitButton onSubmit={onSubmit} />;
};

export default SubmitContainer;
