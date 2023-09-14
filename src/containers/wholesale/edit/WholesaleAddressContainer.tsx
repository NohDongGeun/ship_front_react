import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useEditWholesaleStore } from '../../../store/wholesale/useEditWholesaleStore';

const WholesaleAddressContainer: React.FC = () => {
    const address = useEditWholesaleStore((state) => state.wholesale?.address);
    const update = useEditWholesaleStore((state) => state.update);

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

export default React.memo(WholesaleAddressContainer);
