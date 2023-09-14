import { SelectChangeEvent } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import SelectWithLabel from '../../../components/commons/SelectWithLabel';
import { useGetMarkets } from '../../../hooks/useMarkets';
import { useAddWholesaleStore } from '../../../store/wholesale/useAddWholesaleStore';
import { IMarketEdit } from '../../../types/market';
import { ISelectItem } from '../../../types/selectItem';

const queryString = 'activate=true';

const WholesaleMarketContainer: React.FC = () => {
    const marketId = useAddWholesaleStore((state) => state.wholesale.marketId);
    const update = useAddWholesaleStore((state) => state.update);
    const markets = useGetMarkets(queryString);

    const marketData = useMemo(() => {
        if (!markets) return [];
        return markets.reduce((acc: ISelectItem[], cur: IMarketEdit) => {
            acc.push({ id: cur.id, name: cur.name, value: `${cur.id}` });

            return acc;
        }, []);
    }, [markets]);

    const onSelectMarket = useCallback((e: SelectChangeEvent<string>) => {
        update({ marketId: +e.target.value });
    }, []);

    return (
        <SelectWithLabel
            label={'시장 선택'}
            value={`${marketId}`}
            onSelect={onSelectMarket}
            searchItems={marketData ? marketData : []}
        />
    );
};

export default React.memo(WholesaleMarketContainer);
