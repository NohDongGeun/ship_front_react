import { SelectChangeEvent } from '@mui/material';
import React, { useCallback, useState } from 'react';
import FilterItem from '../../../components/commons/Filter/FilterItem';
import Search from '../../../components/commons/Search';
import { useCategoriesStore } from '../../../store/mainCategory/categoriesStore';

const BANNER_STATUS_TEST_DATA = [
    { id: 1, name: '전체', value: 'all' },
    { id: 2, name: '활성화', value: 'true' },
    { id: 3, name: '비활성화', value: 'false' },
];

const StatusContainer: React.FC = () => {
    const activate = useCategoriesStore((state) => state.activate);
    const setActivate = useCategoriesStore((state) => state.set);

    const onSelectStatus = useCallback((e: SelectChangeEvent<string>) => {
        const value = e.target.value;

        setActivate({ activate: value });
    }, []);

    return (
        <FilterItem label={'Activate'}>
            <Search
                value={activate}
                onSelect={onSelectStatus}
                searchItems={BANNER_STATUS_TEST_DATA}
            />
        </FilterItem>
    );
};

export default React.memo(StatusContainer);
