import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useAddQnaStore } from '../../../store/qna/qnaAddStore';

const QnaAuthorUUIDContainer: React.FC = () => {
    const authorUUID = useAddQnaStore((state) => state.qna.authorUUID);
    const setter = useAddQnaStore((state) => state.update);
    const onChangeQnaTitle = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const value = e.target.value;

            setter({ authorUUID: value });
        },
        []
    );

    return (
        <InputWithLabel
            label={'작성자 UUID'}
            onChange={onChangeQnaTitle}
            value={authorUUID}
        />
    );
};

export default React.memo(QnaAuthorUUIDContainer);
