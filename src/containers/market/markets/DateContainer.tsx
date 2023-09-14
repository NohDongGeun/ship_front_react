import React, { useCallback } from 'react';
import DateSelector from '../../../components/commons/DateSelector';
import FilterItem from '../../../components/commons/Filter/FilterItem';
import { useDate } from '../../../hooks/useFilter';
import { useMarketsStore } from '../../../store/market/marketsStore';

const DateContainer: React.FC = () => {
    const startDate = useMarketsStore((state) => state.state.startDate);
    const endDate = useMarketsStore((state) => state.state.endDate);
    const setter = useMarketsStore((state) => state.actions.set);
    const { onSetDate } = useDate({ setter });

    return (
        <FilterItem label={'Date'}>
            <DateSelector
                startDate={startDate}
                endDate={endDate}
                onSetDate={onSetDate}
            />
        </FilterItem>
    );
};

export default React.memo(DateContainer);
