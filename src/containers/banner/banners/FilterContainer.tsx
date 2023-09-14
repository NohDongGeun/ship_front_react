import React from 'react';
import Filter from '../../../components/commons/Filter';
import FilterButtons from '../../../components/commons/Filter/FilterButtons';
import { PATH_BANNERS } from '../../../constants/pathConstants';
import { useFilter } from '../../../hooks/useFilter';
import { useBannersStore } from '../../../store/banner/bannersStore';
import { createUrlParams } from '../../../utils/param';
import DateContainer from './DateContainer';
import SearchContainer from './SearchContainer';
import StatusContainer from './StatusContainer';

const FilterContainer: React.FC = () => {
    const banners = useBannersStore();
    const { onClickReset, onClickSearch } = useFilter({
        setter: banners.update,
        path: PATH_BANNERS,
        params: createUrlParams({
            page: banners.page,
            searchType: banners.searchType,
            searchTypeValue: banners.searchTypeValue,
            activate: banners.activate,
            startDate: banners.startDate,
            endDate: banners.endDate,
            limit: banners.limit,
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
