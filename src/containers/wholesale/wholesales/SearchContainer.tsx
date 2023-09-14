import { SelectChangeEvent } from '@mui/material';
import React, { useCallback, useState } from 'react';
import FilterItem from '../../../components/commons/Filter/FilterItem';
import FilterSearch from '../../../components/commons/Filter/FilterSearch';
import { useSearch } from '../../../hooks/useFilter';
import { useWholesalesStore } from '../../../store/wholesale/useWholesalesStore';

const WHOLESALE_SEARCH_DATA = [
    { id: 1, name: '도소매 ID', value: 'wholesaleId' },
    { id: 2, name: '도소매 이름', value: 'wholesaleName' },
    { id: 3, name: '시장 이름', value: 'marketName' },
    { id: 4, name: '시장 ID', value: 'marketId' },
    { id: 5, name: '상호명', value: 'storeName' },
    { id: 2, name: '메인 카테고리 ID', value: 'mainCategoryId' },
    { id: 3, name: '메인 카테고리 이름', value: 'mainCategoryName' },
    { id: 4, name: '서브 카테고리 ID', value: 'subCategoryId' },
    { id: 5, name: '서브 카테고리 이름', value: 'subCategoryName' },
];

const SearchContainer: React.FC = () => {
    const searchType = useWholesalesStore((state) => state.searchType);
    const searchTypeValue = useWholesalesStore(
        (state) => state.searchTypeValue
    );
    const setter = useWholesalesStore((state) => state.update);
    const { onSelectSearchType, onChangeSearchInput } = useSearch({ setter });

    return (
        <FilterItem label={'Search'}>
            <FilterSearch
                value={searchTypeValue}
                searchType={searchType}
                searchItems={WHOLESALE_SEARCH_DATA}
                onChangeSearchInput={onChangeSearchInput}
                onSelectSearchType={onSelectSearchType}
            />
        </FilterItem>
    );
};

export default React.memo(SearchContainer);
