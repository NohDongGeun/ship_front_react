import React from 'react';
import DateSelector from '../../../components/commons/DateSelector';
import FilterItem from '../../../components/commons/Filter/FilterItem';
import { useDate } from '../../../hooks/useFilter';
import { useServiceCategoriesStore } from '../../../store/serviceCategory/serviceCategoriesStore';

const DateContainer: React.FC = () => {
    const startDate = useServiceCategoriesStore((state) => state.startDate);
    const endDate = useServiceCategoriesStore((state) => state.endDate);
    const setter = useServiceCategoriesStore((state) => state.set);
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
