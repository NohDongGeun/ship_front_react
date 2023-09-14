import React from 'react';
import DateSelector from '../../../components/commons/DateSelector';
import FilterItem from '../../../components/commons/Filter/FilterItem';
import { useDate } from '../../../hooks/useFilter';
import { useCommunityCategoriesStore } from '../../../store/communityCategory/communityCategoriesStore';

const DateContainer: React.FC = () => {
    const startDate = useCommunityCategoriesStore((state) => state.startDate);
    const endDate = useCommunityCategoriesStore((state) => state.endDate);
    const setter = useCommunityCategoriesStore((state) => state.set);
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
