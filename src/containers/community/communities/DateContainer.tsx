import React from 'react';
import DateSelector from '../../../components/commons/DateSelector';
import FilterItem from '../../../components/commons/Filter/FilterItem';
import { useDate } from '../../../hooks/useFilter';
import { useCommunitiesStore } from '../../../store/community/communitiesStore';

const DateContainer: React.FC = () => {
    const startDate = useCommunitiesStore((state) => state.startDate);
    const endDate = useCommunitiesStore((state) => state.endDate);
    const setter = useCommunitiesStore((state) => state.update);
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

export default DateContainer;
