import React from 'react';
import FilterItem from '../../../components/commons/Filter/FilterItem';
import FilterSearch from '../../../components/commons/Filter/FilterSearch';
import { useSearch } from '../../../hooks/useFilter';
import { useExpertsStore } from '../../../store/expert/expertsStore';

const EXPERT_SEARCH_DATA = [
    { id: 1, name: '전문가 ID', value: 'expertId' },
    { id: 2, name: '전문가 이름', value: 'expertName' },
    { id: 3, name: '메인 카테고리 ID', value: 'mainCategoryId' },
    { id: 4, name: '메인 카테고리 이름', value: 'mainCategoryName' },
    { id: 5, name: '서브 카테고리 ID', value: 'subCategoryId' },
    { id: 2, name: '서브 카테고리 이름', value: 'subCategoryName' },
    { id: 3, name: '전통시장 ID', value: 'marketId' },
    { id: 4, name: '전통시장 이름', value: 'marketName' },
];

const SearchContainer: React.FC = () => {
    const searchType = useExpertsStore((state) => state.searchType);
    const searchTypeValue = useExpertsStore((state) => state.searchTypeValue);
    const setter = useExpertsStore((state) => state.update);
    const { onSelectSearchType, onChangeSearchInput } = useSearch({ setter });

    return (
        <FilterItem label={'Search'}>
            <FilterSearch
                value={searchTypeValue}
                searchType={searchType}
                searchItems={EXPERT_SEARCH_DATA}
                onChangeSearchInput={onChangeSearchInput}
                onSelectSearchType={onSelectSearchType}
            />
        </FilterItem>
    );
};

export default React.memo(SearchContainer);
