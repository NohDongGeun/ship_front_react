import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useAddWholesaleStore } from '../../../store/wholesale/useAddWholesaleStore';

const WholesaleAddressContainer: React.FC = () => {
    const address = useAddWholesaleStore((state) => state.wholesale.address);
    const update = useAddWholesaleStore((state) => state.update);

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

export default React.memo(WholesaleAddressContainer);
