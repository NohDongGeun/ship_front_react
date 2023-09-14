import React, { useCallback } from 'react';
import Filter from '../../../components/commons/Filter';
import FilterButtons from '../../../components/commons/Filter/FilterButtons';
import { PATH_COMMUNITIES } from '../../../constants/pathConstants';
import { useFilter } from '../../../hooks/useFilter';
import { useCommunitiesStore } from '../../../store/community/communitiesStore';
import { createUrlParams } from '../../../utils/param';
import DateContainer from './DateContainer';
import SearchContainer from './SearchContainer';
import StatusContainer from './StatusContainer';

const FilterContainer: React.FC = () => {
    const filters = useCommunitiesStore();
    const { onClickReset, onClickSearch } = useFilter({
        setter: filters.update,
        path: PATH_COMMUNITIES,
        params: createUrlParams({
            page: filters.page,
            searchType: filters.searchType,
            searchTypeValue: filters.searchTypeValue,
            activate: filters.activate,
            startDate: filters.startDate,
            endDate: filters.endDate,
            limit: filters.limit,
            // matchingStatus: filters.matchingStatus,
        }),
    });
    return (
        <Filter>
            <StatusContainer />
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
