import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useAddQnaStore } from '../../../store/qna/qnaAddStore';

const QnaTitleContainer: React.FC = () => {
    const title = useAddQnaStore((state) => state.qna.title);
    const setter = useAddQnaStore((state) => state.update);
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
        />
    );
};

export default React.memo(QnaTitleContainer);
