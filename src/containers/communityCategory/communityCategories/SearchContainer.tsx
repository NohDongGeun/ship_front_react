import React from 'react';
import FilterItem from '../../../components/commons/Filter/FilterItem';
import FilterSearch from '../../../components/commons/Filter/FilterSearch';
import { useSearch } from '../../../hooks/useFilter';
import { useCommunityCategoriesStore } from '../../../store/communityCategory/communityCategoriesStore';

const COMMUNITY_CATEGORY_SEARCH_DATA = [
    { id: 1, name: '커뮤니티 카테고리 TYPE', value: 'type' },
    { id: 2, name: '커뮤니티 카테고리 이름', value: 'communityCategoryName' },
    { id: 3, name: '커뮤니티 카테고리 ID', value: 'communityCategoryId' },
];

const SearchContainer: React.FC = () => {
    const searchType = useCommunityCategoriesStore((state) => state.searchType);
    const searchTypeValue = useCommunityCategoriesStore(
        (state) => state.searchTypeValue
    );
    const setter = useCommunityCategoriesStore((state) => state.set);
    const { onSelectSearchType, onChangeSearchInput } = useSearch({ setter });

    return (
        <FilterItem label={'Search'}>
            <FilterSearch
                value={searchTypeValue}
                searchType={searchType}
                searchItems={COMMUNITY_CATEGORY_SEARCH_DATA}
                onChangeSearchInput={onChangeSearchInput}
                onSelectSearchType={onSelectSearchType}
            />
        </FilterItem>
    );
};

export default React.memo(SearchContainer);
