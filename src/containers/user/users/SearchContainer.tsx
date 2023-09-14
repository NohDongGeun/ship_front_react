import React from 'react';
import FilterItem from '../../../components/commons/Filter/FilterItem';
import FilterSearch from '../../../components/commons/Filter/FilterSearch';
import { useSearch } from '../../../hooks/useFilter';
import { useUsersStore } from '../../../store/user/usersStore';

const USER_SEARCH_DATA = [
    { id: 1, name: '유저 UUID', value: 'userId' },
    { id: 2, name: '유저 이름', value: 'userName' },
    { id: 3, name: '유저 이메일', value: 'identyKey' },
    { id: 4, name: '유저 핸드폰번호', value: 'phone' },
];

const SearchContainer: React.FC = () => {
    const searchType = useUsersStore((state) => state.searchType);
    const searchTypeValue = useUsersStore((state) => state.searchTypeValue);
    const setter = useUsersStore((state) => state.update);
    const { onSelectSearchType, onChangeSearchInput } = useSearch({ setter });

    return (
        <FilterItem label={'Search'}>
            <FilterSearch
                value={searchTypeValue}
                searchType={searchType}
                searchItems={USER_SEARCH_DATA}
                onChangeSearchInput={onChangeSearchInput}
                onSelectSearchType={onSelectSearchType}
            />
        </FilterItem>
    );
};

export default React.memo(SearchContainer);
