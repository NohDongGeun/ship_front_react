import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useAddWholesaleStore } from '../../../store/wholesale/useAddWholesaleStore';

const WholesaleBusinessNumberContainer: React.FC = () => {
    const businessNumber = useAddWholesaleStore(
        (state) => state.wholesale.businessNumber
    );
    const update = useAddWholesaleStore((state) => state.update);

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

export default React.memo(WholesaleBusinessNumberContainer);
