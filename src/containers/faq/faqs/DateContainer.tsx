import React from 'react';
import DateSelector from '../../../components/commons/DateSelector';
import FilterItem from '../../../components/commons/Filter/FilterItem';
import { useDate } from '../../../hooks/useFilter';
import { useFaqsStore } from '../../../store/faq/faqsStore';

const DateContainer: React.FC = () => {
    const startDate = useFaqsStore((state) => state.startDate);
    const endDate = useFaqsStore((state) => state.endDate);
    const setter = useFaqsStore((state) => state.update);
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
