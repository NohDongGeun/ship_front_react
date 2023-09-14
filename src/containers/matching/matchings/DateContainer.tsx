import React from 'react';
import DateSelector from '../../../components/commons/DateSelector';
import FilterItem from '../../../components/commons/Filter/FilterItem';
import { useDate } from '../../../hooks/useFilter';
import { useMatchingsStore } from '../../../store/matching/matchingsStore';

const DateContainer: React.FC = () => {
    const startDate = useMatchingsStore((state) => state.startDate);
    const endDate = useMatchingsStore((state) => state.endDate);
    const setter = useMatchingsStore((state) => state.set);
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
