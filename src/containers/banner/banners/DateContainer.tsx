import React from 'react';
import DateSelector from '../../../components/commons/DateSelector';
import FilterItem from '../../../components/commons/Filter/FilterItem';
import { useDate } from '../../../hooks/useFilter';
import { useBannersStore } from '../../../store/banner/bannersStore';

const DateContainer: React.FC = () => {
    const startDate = useBannersStore((state) => state.startDate);
    const endDate = useBannersStore((state) => state.endDate);
    const setter = useBannersStore((state) => state.update);
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
