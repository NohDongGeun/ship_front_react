import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useEditWholesaleStore } from '../../../store/wholesale/useEditWholesaleStore';

const WholesaleStoreNameContainer: React.FC = () => {
    const storeName = useEditWholesaleStore(
        (state) => state.wholesale?.storeName
    );
    const update = useEditWholesaleStore((state) => state.update);

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
            value={storeName ? storeName : ''}
        />
    );
};

export default React.memo(WholesaleStoreNameContainer);
