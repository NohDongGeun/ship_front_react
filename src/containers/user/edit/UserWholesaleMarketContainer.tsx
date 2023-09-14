import { SelectChangeEvent } from '@mui/material';
import { List } from 'immutable';
import React, { useCallback, useState } from 'react';
import SelectWithLabel from '../../../components/commons/SelectWithLabel';
const USER_PRO_MARKET_LIST = List([
    { id: 1, value: '1', name: '서울신당중앙시장' },
    { id: 2, value: '2', name: '마장동축산시장' },
    { id: 3, value: '3', name: '인헌시장' },
    { id: 4, value: '4', name: '노량진수산시장' },
]);

const UserWholesaleMarketContainer: React.FC = () => {
    const [market, setMarket] = useState<string>('');
    const onSelectMarket = useCallback((e: SelectChangeEvent<string>) => {
        const value = e.target.value;
        setMarket(value);
    }, []);

    return (
        <SelectWithLabel
            label={'시장'}
            onSelect={onSelectMarket}
            value={market}
            searchItems={USER_PRO_MARKET_LIST}
        />
    );
};

export default React.memo(UserWholesaleMarketContainer);
