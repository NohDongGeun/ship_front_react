import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useEditExpertStore } from '../../../store/expert/expertEditStore';

const ExpertBusinessNumberContainer: React.FC = () => {
    const businessNumber = useEditExpertStore(
        (state) => state.expert?.businessNumber
    );
    const update = useEditExpertStore((state) => state.update);

    const onChangeBusinessNumber = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const value = e.target.value;

            update({ businessNumber: value });
        },
        []
    );

    return (
        <InputWithLabel
            label={'사업자 번호'}
            onChange={onChangeBusinessNumber}
            value={businessNumber ? businessNumber : ''}
        />
    );
};

export default React.memo(ExpertBusinessNumberContainer);
