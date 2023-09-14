import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useEditQnaStore } from '../../../store/qna/qnaEditStore';

const QnaAuthorUUIDContainer: React.FC = () => {
    const authorUUID = useEditQnaStore((state) => state.qna.authorUUID);
    const setter = useEditQnaStore((state) => state.update);
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
            readonly={true}
        />
    );
};

export default React.memo(QnaAuthorUUIDContainer);
