import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useAddExpertStore } from '../../../store/expert/expertAddStore';

const ExpertAddressContainer: React.FC = () => {
    const address = useAddExpertStore((state) => state.expert.address);
    const update = useAddExpertStore((state) => state.update);

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
            value={address}
        />
    );
};

export default React.memo(ExpertAddressContainer);
