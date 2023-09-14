import React, { useCallback, useState } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useEditMarketStore } from '../../../store/market/marketEditStore';

const MarketNameContainer: React.FC = () => {
    const name = useEditMarketStore((state) => state.market?.name);
    const setter = useEditMarketStore((state) => state.updateMarket);

    const onChangeMarketName = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const value = e.target.value;

            setter({ name: value });
        },
        []
    );

    return (
        <InputWithLabel
            label={'이름'}
            onChange={onChangeMarketName}
            value={name ? name : ''}
            readonly={false}
        />
    );
};

export default React.memo(MarketNameContainer);
