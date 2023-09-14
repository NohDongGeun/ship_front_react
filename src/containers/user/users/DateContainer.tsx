import React from 'react';
import DateSelector from '../../../components/commons/DateSelector';
import FilterItem from '../../../components/commons/Filter/FilterItem';
import { useDate } from '../../../hooks/useFilter';
import { useUsersStore } from '../../../store/user/usersStore';

const DateContainer: React.FC = () => {
    const startDate = useUsersStore((state) => state.startDate);
    const endDate = useUsersStore((state) => state.endDate);
    const setter = useUsersStore((state) => state.update);
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
