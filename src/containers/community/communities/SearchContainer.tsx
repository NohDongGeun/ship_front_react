import React from 'react';
import FilterItem from '../../../components/commons/Filter/FilterItem';
import FilterSearch from '../../../components/commons/Filter/FilterSearch';
import { useSearch } from '../../../hooks/useFilter';
import { useCommunitiesStore } from '../../../store/community/communitiesStore';

const COMMUNITIES_SEARCH_DATA = [
    { id: 1, name: '커뮤니티 ID', value: 'communityId' },
    { id: 2, name: '작성자 UUID', value: 'authorUUID' },
    { id: 2, name: '커뮤니티 제목', value: 'communityTitle' },
    { id: 2, name: '작성자 이름', value: 'authorName' },
];

const SearchContainer: React.FC = () => {
    const searchType = useCommunitiesStore((state) => state.searchType);
    const searchTypeValue = useCommunitiesStore(
        (state) => state.searchTypeValue
    );
    const setter = useCommunitiesStore((state) => state.update);
    const { onSelectSearchType, onChangeSearchInput } = useSearch({ setter });

    return (
        <FilterItem label={'Search'}>
            <FilterSearch
                value={searchTypeValue}
                searchType={searchType}
                searchItems={COMMUNITIES_SEARCH_DATA}
                onChangeSearchInput={onChangeSearchInput}
                onSelectSearchType={onSelectSearchType}
            />
        </FilterItem>
    );
};

export default React.memo(SearchContainer);
