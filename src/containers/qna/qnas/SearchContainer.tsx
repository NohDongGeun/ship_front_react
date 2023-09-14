import React from 'react';
import FilterItem from '../../../components/commons/Filter/FilterItem';
import FilterSearch from '../../../components/commons/Filter/FilterSearch';
import { useSearch } from '../../../hooks/useFilter';
import { useQnasStore } from '../../../store/qna/qnasStore';

const QNAS_SEARCH_DATA = [
    { id: 1, name: 'QNA ID', value: 'qnaId' },
    { id: 2, name: 'QNA TITLE', value: 'qnaTitle' },
    { id: 3, name: '작성자 UUID', value: 'authorUUID' },
    { id: 4, name: '작성자 이름', value: 'authorName' },
];

const SearchContainer: React.FC = () => {
    const searchType = useQnasStore((state) => state.searchType);
    const searchTypeValue = useQnasStore((state) => state.searchTypeValue);
    const setter = useQnasStore((state) => state.update);
    const { onSelectSearchType, onChangeSearchInput } = useSearch({ setter });

    return (
        <FilterItem label={'Search'}>
            <FilterSearch
                value={searchTypeValue}
                searchType={searchType}
                searchItems={QNAS_SEARCH_DATA}
                onChangeSearchInput={onChangeSearchInput}
                onSelectSearchType={onSelectSearchType}
            />
        </FilterItem>
    );
};

export default React.memo(SearchContainer);
