import { SelectChangeEvent } from '@mui/material';
import { List } from 'immutable';
import React, { useCallback, useState } from 'react';
import SelectWithLabel from '../../../components/commons/SelectWithLabel';
import { useEditMarketStore } from '../../../store/market/marketEditStore';

const MARKET_TEST_STATUS = [
    { id: 1, value: 'true', name: '활성화' },
    { id: 2, value: 'false', name: '비활성화' },
];

const MarketStatusContainer: React.FC = () => {
    const activate = useEditMarketStore((state) => state.market?.activate);
    const setter = useEditMarketStore((state) => state.updateMarket);
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
