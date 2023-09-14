import { SelectChangeEvent } from '@mui/material';
import React, { useCallback } from 'react';
import SelectWithLabel from '../../../components/commons/SelectWithLabel';
import { useAddMarketStore } from '../../../store/market/marketAddStore';

const MARKET_TEST_STATUS = [
    { id: 1, value: 'true', name: '활성화' },
    { id: 2, value: 'false', name: '비활성화' },
];
const MarketStatusContainer: React.FC = () => {
    const activate = useAddMarketStore((state) => state.market.activate);
    const setter = useAddMarketStore((state) => state.set);
    const onSelctStatus = useCallback((e: SelectChangeEvent<string>) => {
        const value = e.target.value;

        setter({ activate: value === 'true' });
    }, []);

    return (
        <SelectWithLabel
            searchItems={MARKET_TEST_STATUS}
            label={'상태'}
            onSelect={onSelctStatus}
            value={`${activate}`}
        />
    );
};

export default React.memo(MarketStatusContainer);
