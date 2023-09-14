import React from 'react';
import DateSelector from '../../../components/commons/DateSelector';
import FilterItem from '../../../components/commons/Filter/FilterItem';
import { useDate } from '../../../hooks/useFilter';
import { useQnasStore } from '../../../store/qna/qnasStore';

const DateContainer: React.FC = () => {
    const startDate = useQnasStore((state) => state.startDate);
    const endDate = useQnasStore((state) => state.endDate);
    const setter = useQnasStore((state) => state.update);
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
