import React from 'react';
import DateSelector from '../../../components/commons/DateSelector';
import FilterItem from '../../../components/commons/Filter/FilterItem';
import { useDate } from '../../../hooks/useFilter';
import { useExpertsStore } from '../../../store/expert/expertsStore';

const DateContainer: React.FC = () => {
    const startDate = useExpertsStore((state) => state.startDate);
    const endDate = useExpertsStore((state) => state.endDate);
    const setter = useExpertsStore((state) => state.update);
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
