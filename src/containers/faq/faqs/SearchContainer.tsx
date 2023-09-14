import { SelectChangeEvent } from '@mui/material';
import React, { useCallback, useState } from 'react';
import FilterItem from '../../../components/commons/Filter/FilterItem';
import FilterSearch from '../../../components/commons/Filter/FilterSearch';
import { useSearch } from '../../../hooks/useFilter';
import { useFaqsStore } from '../../../store/faq/faqsStore';

const FAQS_SEARCH_DATA = [
    { id: 1, name: 'FAQ ID', value: 'id' },
    { id: 2, name: 'FAQ TITLE', value: 'title' },
];

const SearchContainer: React.FC = () => {
    const searchType = useFaqsStore((state) => state.searchType);
    const searchTypeValue = useFaqsStore((state) => state.searchTypeValue);
    const setter = useFaqsStore((state) => state.update);
    const { onSelectSearchType, onChangeSearchInput } = useSearch({ setter });

    return (
        <FilterItem label={'Search'}>
            <FilterSearch
                value={searchTypeValue}
                searchType={searchType}
                searchItems={FAQS_SEARCH_DATA}
                onChangeSearchInput={onChangeSearchInput}
                onSelectSearchType={onSelectSearchType}
            />
        </FilterItem>
    );
};

export default React.memo(SearchContainer);
