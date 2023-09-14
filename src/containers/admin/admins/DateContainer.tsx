import React from 'react';
import DateSelector from '../../../components/commons/DateSelector';
import FilterItem from '../../../components/commons/Filter/FilterItem';
import { useDate } from '../../../hooks/useFilter';
import { useAdminsStore } from '../../../store/admin/adminsStore';

const DateContainer: React.FC = () => {
    const startDate = useAdminsStore((state) => state.startDate);
    const endDate = useAdminsStore((state) => state.endDate);
    const setter = useAdminsStore((state) => state.update);
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
