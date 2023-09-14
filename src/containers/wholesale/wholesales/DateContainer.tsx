import React from 'react';
import DateSelector from '../../../components/commons/DateSelector';
import FilterItem from '../../../components/commons/Filter/FilterItem';
import { useDate } from '../../../hooks/useFilter';
import { useWholesalesStore } from '../../../store/wholesale/useWholesalesStore';

const DateContainer: React.FC = () => {
    const startDate = useWholesalesStore((state) => state.startDate);
    const endDate = useWholesalesStore((state) => state.endDate);
    const setter = useWholesalesStore((state) => state.update);
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
