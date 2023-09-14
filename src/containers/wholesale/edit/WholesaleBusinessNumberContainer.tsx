import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useEditWholesaleStore } from '../../../store/wholesale/useEditWholesaleStore';

const WholesaleBusinessNumberContainer: React.FC = () => {
    const businessNumber = useEditWholesaleStore(
        (state) => state.wholesale?.businessNumber
    );
    const update = useEditWholesaleStore((state) => state.update);

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

export default React.memo(WholesaleBusinessNumberContainer);
