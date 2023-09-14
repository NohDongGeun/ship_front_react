import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useEditQnaStore } from '../../../store/qna/qnaEditStore';

const QnaTitleContainer: React.FC = () => {
    const title = useEditQnaStore((state) => state.qna.title);
    const setter = useEditQnaStore((state) => state.update);
    const onChangeQnaTitle = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const value = e.target.value;

            setter({ title: value });
        },
        []
    );

    return (
        <InputWithLabel
            label={'제목'}
            onChange={onChangeQnaTitle}
            value={title}
            readonly={true}
        />
    );
};

export default React.memo(QnaTitleContainer);
