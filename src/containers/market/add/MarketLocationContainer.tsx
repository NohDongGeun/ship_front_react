import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useAddMarketStore } from '../../../store/market/marketAddStore';

const MarketLocationContainer: React.FC = () => {
    const address = useAddMarketStore((state) => state.market.address);
    const setter = useAddMarketStore((state) => state.set);
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
            value={address}
            onChange={onChangeMarketLocation}
        />
    );
};

export default React.memo(MarketLocationContainer);
