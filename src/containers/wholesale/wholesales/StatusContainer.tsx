import { SelectChangeEvent } from '@mui/material';
import React, { useCallback, useState } from 'react';
import FilterItem from '../../../components/commons/Filter/FilterItem';
import Search from '../../../components/commons/Search';
import { useActivate } from '../../../hooks/useFilter';
import { useWholesalesStore } from '../../../store/wholesale/useWholesalesStore';

const WHOLESALE_STATUS_DATA = [
    { id: 1, name: '전체', value: 'all' },
    { id: 2, name: '활성화', value: 'true' },
    { id: 3, name: '비활성화', value: 'false' },
];

const StatusContainer: React.FC = () => {
    const activate = useWholesalesStore((state) => state.activate);
    const setter = useWholesalesStore((state) => state.update);
    const { onSelectStatus } = useActivate({ setter });

    return (
        <FilterItem label={'Status'}>
            <Search
                value={activate}
                onSelect={onSelectStatus}
                searchItems={WHOLESALE_STATUS_DATA}
            />
        </FilterItem>
    );
};

export default React.memo(StatusContainer);
