import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import React, { useCallback } from 'react';
import { updateQna } from '../../../api/qnas';
import SubmitButton from '../../../components/commons/SubmitButton';
import { PATH_QNAS } from '../../../constants/pathConstants';
import { useSubmitHandler } from '../../../hooks/useHandler';
import { useGetQna } from '../../../hooks/useQnas';
import { useEditQnaStore } from '../../../store/qna/qnaEditStore';
import { IErrorResponse } from '../../../types/error';
import { IEditQna } from '../../../types/qna';
import { ICreateComment } from '../../../types/comment';

interface ISubmitContainer {
    qnaId: string;
}

const SubmitContainer: React.FC<ISubmitContainer> = ({ qnaId }) => {
    const session = useSession();
    const qna = useEditQnaStore((state) => state.qna);
    const oldQna = useGetQna(qnaId);

    const {
        isLoading,
        isSuccess,
        mutate,
        error,
    } = useMutation((data: { data: any; qnaId: string; accessToken: string }) =>
        updateQna(data.qnaId, data.data, data.accessToken)
    );

    useSubmitHandler(
        isLoading,
        isSuccess,
        PATH_QNAS,
        error as AxiosError<IErrorResponse>
    );

    const onSubmit = useCallback(() => {
        const accessToken = session.data?.user.accessToken;

        if (!oldQna) return;

        const oldbie = oldQna;

        if (!accessToken || !oldbie) return;

        if (!qna.title) {
            alert('제목을 입력해주세요.');
            return;
        }

        if (!qna.content) {
            alert('컨텐츠를 입력해주세요.');
            return;
        }

        if (!qna.serviceCategory) {
            alert('카테고리를 선택해주세요.');
            return;
        }

        const tempQna: Partial<IEditQna> = {};

        if (oldbie.title !== qna.title) {
            // 제목 변경
            tempQna.title = qna.title;
        }

        if (oldbie.qnaStatus !== qna.qnaStatus) {
            tempQna.qnaStatus = qna.qnaStatus;
        }

        if (oldbie.content !== qna.content) {
            // 컨텐츠 변경
            tempQna.content = qna.content;
        }

        if (
            oldbie.serviceCategory &&
            oldbie.serviceCategory.id !== qna.serviceCategory.id
        ) {
            // 주소 변경
            tempQna.serviceCategoryId = qna.serviceCategory.id;
        }

        if (oldbie.activate !== qna.activate) {
            //활성화 변경
            tempQna.activate = qna.activate;
        }

        if (oldbie.comments && oldbie.comments[0]) {
            if (qna.comments && qna.comments[0]) {
                if (oldbie.comments[0].content !== qna.comments[0].content) {
                    // 댓글 수정
                    const editComments: ICreateComment[] = [qna.comments[0]];

                    tempQna.editComments = editComments;
                }
            }
        } else if (qna.comments && qna.comments[0]) {
            // 댓글 추가

            const addComments: ICreateComment[] = [qna.comments[0]];
            tempQna.addComments = addComments;
        }
        mutate({ qnaId: `${qna.id}`, data: tempQna, accessToken });
    }, [qna, oldQna]);

    return <SubmitButton onSubmit={onSubmit} />;
};

export default SubmitContainer;
