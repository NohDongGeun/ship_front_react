import { SelectChangeEvent } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import SelectWithLabel from '../../../components/commons/SelectWithLabel';
import { useGetMarkets } from '../../../hooks/useMarkets';
import { useEditWholesaleStore } from '../../../store/wholesale/useEditWholesaleStore';
import { IMarketEdit } from '../../../types/market';
import { ISelectItem } from '../../../types/selectItem';

const queryString = 'activate=true';

const WholesaleMarketContainer: React.FC = () => {
    const market = useEditWholesaleStore((state) => state.wholesale?.market);
    const update = useEditWholesaleStore((state) => state.update);
    const markets = useGetMarkets(queryString);

    const marketData = useMemo(() => {
        if (!markets) return [];
        return markets.reduce((acc: ISelectItem[], cur: IMarketEdit) => {
            acc.push({ id: cur.id, name: cur.name, value: `${cur.id}` });

            return acc;
        }, []);
    }, [markets]);

    const onSelectMarket = useCallback(
        (e: SelectChangeEvent<string>) => {
            const selectMarket = markets.find(
                (item: IMarketEdit) => item.id === +e.target.value
            );
            if (!selectMarket) return;
            update({ market: selectMarket });
        },
        [markets]
    );

    return (
        <SelectWithLabel
            label={'시장 선택'}
            value={`${market ? market.id : 0}`}
            onSelect={onSelectMarket}
            searchItems={marketData ? marketData : []}
        />
    );
};

export default React.memo(WholesaleMarketContainer);
