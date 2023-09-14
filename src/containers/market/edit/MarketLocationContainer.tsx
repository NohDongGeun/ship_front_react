import React, { useCallback, useState } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useEditMarketStore } from '../../../store/market/marketEditStore';

const MarketLocationContainer: React.FC = () => {
    const address = useEditMarketStore((state) => state.market?.address);
    const setter = useEditMarketStore((state) => state.updateMarket);

    const onChangeMarketLocation = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const value = e.target.value;

            setter({ address: value });
        },
        []
    );

    return (
        <InputWithLabel
            label={'주소'}
            value={address ? address : ''}
            onChange={onChangeMarketLocation}
        />
    );
};

export default React.memo(MarketLocationContainer);
