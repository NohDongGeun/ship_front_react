import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useAddWholesaleStore } from '../../../store/wholesale/useAddWholesaleStore';

const WholesaleStoreNameContainer: React.FC = () => {
    const storeName = useAddWholesaleStore(
        (state) => state.wholesale.storeName
    );
    const update = useAddWholesaleStore((state) => state.update);

    const onChangeStore = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const value = e.target.value;

            update({ storeName: value });
        },
        []
    );
    return (
        <InputWithLabel
            label={'상점 이름'}
            onChange={onChangeStore}
            value={storeName}
        />
    );
};

export default React.memo(WholesaleStoreNameContainer);
