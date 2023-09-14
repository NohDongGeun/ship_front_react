import React from 'react';
import Filter from '../../../components/commons/Filter';
import FilterButtons from '../../../components/commons/Filter/FilterButtons';
import { PATH_MARKETS } from '../../../constants/pathConstants';
import { useFilter } from '../../../hooks/useFilter';
import { useMarketsStore } from '../../../store/market/marketsStore';
import { createUrlParams } from '../../../utils/param';
import DateContainer from './DateContainer';
import SearchContainer from './SearchContainer';
import StatusContainer from './StatusContainer';

const FilterContainer: React.FC = () => {
    const markets = useMarketsStore();
    const { onClickReset, onClickSearch } = useFilter({
        setter: markets.actions.set,
        path: PATH_MARKETS,
        params: createUrlParams({
            page: markets.state.page,
            searchType: markets.state.searchType,
            searchTypeValue: markets.state.searchTypeValue,
            activate: markets.state.activate,
            startDate: markets.state.startDate,
            endDate: markets.state.endDate,
            limit: markets.state.limit,
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
