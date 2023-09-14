import React from 'react';
import FilterItem from '../../../components/commons/Filter/FilterItem';
import FilterSearch from '../../../components/commons/Filter/FilterSearch';
import { useSearch } from '../../../hooks/useFilter';
import { useBannersStore } from '../../../store/banner/bannersStore';

const BANNER_SEARCH_DATA = [{ id: 1, name: '배너 ID', value: 'bannerId' }];

const SearchContainer: React.FC = () => {
    const searchType = useBannersStore((state) => state.searchType);
    const searchTypeValue = useBannersStore((state) => state.searchTypeValue);
    const setter = useBannersStore((state) => state.update);
    const { onSelectSearchType, onChangeSearchInput } = useSearch({ setter });

    return (
        <FilterItem label={'Search'}>
            <FilterSearch
                value={searchTypeValue}
                searchType={searchType}
                searchItems={BANNER_SEARCH_DATA}
                onChangeSearchInput={onChangeSearchInput}
                onSelectSearchType={onSelectSearchType}
            />
        </FilterItem>
    );
};

export default React.memo(SearchContainer);
