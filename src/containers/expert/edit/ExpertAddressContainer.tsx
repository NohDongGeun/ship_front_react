import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useEditExpertStore } from '../../../store/expert/expertEditStore';

const ExpertAddressContainer: React.FC = () => {
    const address = useEditExpertStore((state) => state.expert?.address);
    const update = useEditExpertStore((state) => state.update);

    const onChangeAddress = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const value = e.target.value;

            update({ address: value });
        },
        []
    );

    return (
        <InputWithLabel
            label={'주소'}
            onChange={onChangeAddress}
            value={address ? address : ''}
        />
    );
};

export default React.memo(ExpertAddressContainer);
