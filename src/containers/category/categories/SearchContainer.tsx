import { SelectChangeEvent } from '@mui/material';
import React, { useCallback, useState } from 'react';
import FilterItem from '../../../components/commons/Filter/FilterItem';
import FilterSearch from '../../../components/commons/Filter/FilterSearch';
import { useCategoriesStore } from '../../../store/mainCategory/categoriesStore';

const CATEGORY_SEARCH_TYPE_DATA = [
    { id: 1, name: '메인 카테고리 ID', value: 'mainCategoryId' },
    { id: 2, name: '메인 카테고리 이름', value: 'mainCategoryName' },
    { id: 3, name: '서브 카테고리 ID', value: 'subCategoryId' },
    { id: 4, name: '서브 카테고리 이름', value: 'subCategoryName' },
];

const SearchContainer: React.FC = () => {
    const searchType = useCategoriesStore((state) => state.searchType);
    const searchTypeValue = useCategoriesStore(
        (state) => state.searchTypeValue
    );
    const setter = useCategoriesStore((state) => state.set);
    const onChangeSearchInput = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const value = e.target.value;

            setter({ searchTypeValue: value });
        },
        []
    );

    const onSelectSearchType = useCallback((e: SelectChangeEvent<string>) => {
        const value = e.target.value;

        setter({ searchType: value });
    }, []);

    return (
        <FilterItem label={'Search'}>
            <FilterSearch
                value={searchTypeValue}
                searchType={searchType}
                searchItems={CATEGORY_SEARCH_TYPE_DATA}
                onChangeSearchInput={onChangeSearchInput}
                onSelectSearchType={onSelectSearchType}
            />
        </FilterItem>
    );
};

export default React.memo(SearchContainer);
