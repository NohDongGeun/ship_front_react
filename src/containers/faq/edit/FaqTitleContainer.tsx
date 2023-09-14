import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useEditFaqStore } from '../../../store/faq/faqEditStore';

const FaqContentContainer: React.FC = () => {
    const title = useEditFaqStore((state) => state.faq?.title);
    const setter = useEditFaqStore((state) => state.update);
    const onChangeFaqTitle = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const value = e.target.value;

            setter({ title: value });
        },
        []
    );

    return (
        <InputWithLabel
            label={'제목'}
            onChange={onChangeFaqTitle}
            value={title ? title : ''}
        />
    );
};

export default React.memo(FaqContentContainer);
