import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useAddExpertStore } from '../../../store/expert/expertAddStore';

const ExpertBusinessNumberContainer: React.FC = () => {
    const businessNumber = useAddExpertStore(
        (state) => state.expert.businessNumber
    );
    const update = useAddExpertStore((state) => state.update);

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
            value={businessNumber}
        />
    );
};

export default React.memo(ExpertBusinessNumberContainer);
