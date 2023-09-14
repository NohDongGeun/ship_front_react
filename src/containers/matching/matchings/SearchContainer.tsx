import { SelectChangeEvent } from '@mui/material';
import React from 'react';
import FilterItem from '../../../components/commons/Filter/FilterItem';
import FilterSearch from '../../../components/commons/Filter/FilterSearch';
import { useSearch } from '../../../hooks/useFilter';
import { useMatchingsStore } from '../../../store/matching/matchingsStore';

const MATCHING_SEARCH_DATA = [
    { id: 1, name: '매칭 ID', value: 'matchingId' },
    { id: 2, name: '전문가 ID', value: 'expertId' },
    { id: 3, name: '전문가 이름', value: 'expertName' },
    { id: 4, name: '신청자 ID', value: 'applicantId' },
    { id: 5, name: '신청자 이름', value: 'applicantName' },
];

const SearchContainer: React.FC = () => {
    const searchType = useMatchingsStore((state) => state.searchType);
    const searchTypeValue = useMatchingsStore((state) => state.searchTypeValue);
    const setter = useMatchingsStore((state) => state.set);
    const { onSelectSearchType, onChangeSearchInput } = useSearch({ setter });

    return (
        <FilterItem label={'Search'}>
            <FilterSearch
                value={searchTypeValue}
                searchType={searchType}
                searchItems={MATCHING_SEARCH_DATA}
                onChangeSearchInput={onChangeSearchInput}
                onSelectSearchType={onSelectSearchType}
            />
        </FilterItem>
    );
};

export default React.memo(SearchContainer);
