import React from 'react';
import Filter from '../../../components/commons/Filter';
import FilterButtons from '../../../components/commons/Filter/FilterButtons';
import { PATH_COMMUNITY_CATEGORIES } from '../../../constants/pathConstants';
import { useFilter } from '../../../hooks/useFilter';
import { useCommunityCategoriesStore } from '../../../store/communityCategory/communityCategoriesStore';
import { createUrlParams } from '../../../utils/param';
import DateContainer from './DateContainer';
import SearchContainer from './SearchContainer';
import StatusContainer from './StatusContainer';

const FilterContainer: React.FC = () => {
    const filters = useCommunityCategoriesStore();
    const { onClickReset, onClickSearch } = useFilter({
        setter: filters.set,
        path: PATH_COMMUNITY_CATEGORIES,
        params: createUrlParams({
            page: filters.page,
            searchType: filters.searchType,
            searchTypeValue: filters.searchTypeValue,
            activate: filters.activate,
            startDate: filters.startDate,
            endDate: filters.endDate,
            limit: filters.limit,
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
