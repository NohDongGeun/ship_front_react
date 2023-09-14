import React from 'react';
import FilterItem from '../../../components/commons/Filter/FilterItem';
import FilterSearch from '../../../components/commons/Filter/FilterSearch';
import { useSearch } from '../../../hooks/useFilter';
import { useServiceCategoriesStore } from '../../../store/serviceCategory/serviceCategoriesStore';

const SERVICE_CATEGORY_SEARCH_DATA = [
    { id: 1, name: '서비스 카테고리 TYPE', value: 'type' },
    { id: 2, name: '서비스 카테고리 이름', value: 'serviceCategoryName' },
    { id: 3, name: '서비스 카테고리 ID', value: 'serviceCategoryId' },
];

const SearchContainer: React.FC = () => {
    const searchType = useServiceCategoriesStore((state) => state.searchType);
    const searchTypeValue = useServiceCategoriesStore(
        (state) => state.searchTypeValue
    );
    const setter = useServiceCategoriesStore((state) => state.set);
    const { onSelectSearchType, onChangeSearchInput } = useSearch({ setter });

    return (
        <FilterItem label={'Search'}>
            <FilterSearch
                value={searchTypeValue}
                searchType={searchType}
                searchItems={SERVICE_CATEGORY_SEARCH_DATA}
                onChangeSearchInput={onChangeSearchInput}
                onSelectSearchType={onSelectSearchType}
            />
        </FilterItem>
    );
};

export default React.memo(SearchContainer);
