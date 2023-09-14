import React from 'react';
import FilterItem from '../../../components/commons/Filter/FilterItem';
import Search from '../../../components/commons/Search';
import { useActivate } from '../../../hooks/useFilter';
import { useExpertsStore } from '../../../store/expert/expertsStore';

const EXPERT_STATUS_DATA = [
    { id: 1, name: '전체', value: 'all' },
    { id: 2, name: '활성화', value: 'true' },
    { id: 3, name: '비활성화', value: 'false' },
];

const StatusContainer: React.FC = () => {
    const activate = useExpertsStore((state) => state.activate);
    const setter = useExpertsStore((state) => state.update);
    const { onSelectStatus } = useActivate({ setter });

    return (
        <FilterItem label={'Status'}>
            <Search
                value={activate}
                onSelect={onSelectStatus}
                searchItems={EXPERT_STATUS_DATA}
            />
        </FilterItem>
    );
};

export default React.memo(StatusContainer);
