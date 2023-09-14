import React, { useCallback } from 'react';
import InputWithLabel from '../../../components/commons/InputWithLabel';
import { useAddMarketStore } from '../../../store/market/marketAddStore';

const MarketNameContainer: React.FC = () => {
    const name = useAddMarketStore((state) => state.market.name);
    const setter = useAddMarketStore((state) => state.set);
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
            value={name}
            readonly={false}
        />
    );
};

export default React.memo(MarketNameContainer);
