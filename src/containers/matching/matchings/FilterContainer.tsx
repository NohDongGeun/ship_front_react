import React, { useCallback } from 'react';
import Filter from '../../../components/commons/Filter';
import FilterButtons from '../../../components/commons/Filter/FilterButtons';
import { PATH_MATCHINGS } from '../../../constants/pathConstants';
import { useFilter } from '../../../hooks/useFilter';
import { useMatchingsStore } from '../../../store/matching/matchingsStore';
import { createUrlParams } from '../../../utils/param';
import DateContainer from './DateContainer';
import MatchingStatusContainer from './MatchingStatusContainer';
import SearchContainer from './SearchContainer';
import StatusContainer from './StatusContainer';

const FilterContainer: React.FC = () => {
    const filters = useMatchingsStore();
    const { onClickReset, onClickSearch } = useFilter({
        setter: filters.set,
        path: PATH_MATCHINGS,
        params: createUrlParams({
            page: filters.page,
            searchType: filters.searchType,
            searchTypeValue: filters.searchTypeValue,
            activate: filters.activate,
            startDate: filters.startDate,
            endDate: filters.endDate,
            limit: filters.limit,
            matchingStatus: filters.matchingStatus,
        }),
    });

    return (
        <Filter>
            <StatusContainer />
            <MatchingStatusContainer />
            <DateContainer />
            <SearchContainer />
            <FilterButtons
                onClickReset={onClickReset}
                onClickSearch={onClickSearch}
            />
        </Filter>
    );
};

export default React.memo(FilterContainer);
