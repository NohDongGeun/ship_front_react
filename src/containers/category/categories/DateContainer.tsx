import React, { useCallback } from 'react';
import DateSelector from '../../../components/commons/DateSelector';
import FilterItem from '../../../components/commons/Filter/FilterItem';
import { useCategoriesStore } from '../../../store/mainCategory/categoriesStore';

const DateContainer: React.FC = () => {
    const startDate = useCategoriesStore((state) => state.startDate);
    const endDate = useCategoriesStore((state) => state.endDate);
    const setDate = useCategoriesStore((state) => state.set);

    const onSetDate = useCallback(
        (start: Date | null | undefined, end: Date | null | undefined) => {
            setDate({
                startDate: start,
                endDate: end,
            });
        },
        []
    );

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

export default DateContainer;
