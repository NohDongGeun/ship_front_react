import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useAddFaqStore } from '../../../store/faq/faqAddStore';

const FaqTitleContainer: React.FC = () => {
    const title = useAddFaqStore((state) => state.faq.title);
    const setter = useAddFaqStore((state) => state.update);
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
            value={title}
        />
    );
};

export default React.memo(FaqTitleContainer);
