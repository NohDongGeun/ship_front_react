import React from 'react';
import FilterItem from '../../../components/commons/Filter/FilterItem';
import FilterSearch from '../../../components/commons/Filter/FilterSearch';
import { useSearch } from '../../../hooks/useFilter';
import { useMarketsStore } from '../../../store/market/marketsStore';

const MARKET_SEARCH_DATA = [
    { id: 1, name: '마켓 ID', value: 'marketId' },
    { id: 2, name: '마켓 이름', value: 'marketName' },
    { id: 3, name: '카테고리 ID', value: 'mainCategoryId' },
    { id: 4, name: '카테고리 이름', value: 'mainCategoryName' },
    { id: 5, name: '서브 카테고리 ID', value: 'subCategoryId' },
    { id: 6, name: '서브 카테고리 이름', value: 'subCategoryName' },
];

const SearchContainer: React.FC = () => {
    const searchType = useMarketsStore((state) => state.state.searchType);
    const searchTypeValue = useMarketsStore(
        (state) => state.state.searchTypeValue
    );
    const setter = useMarketsStore((state) => state.actions.set);
    const { onSelectSearchType, onChangeSearchInput } = useSearch({ setter });

    return (
        <FilterItem label={'Search'}>
            <FilterSearch
                value={searchTypeValue}
                searchType={searchType}
                searchItems={MARKET_SEARCH_DATA}
                onChangeSearchInput={onChangeSearchInput}
                onSelectSearchType={onSelectSearchType}
            />
        </FilterItem>
    );
};

export default React.memo(SearchContainer);
