import React, { useCallback } from 'react';
import Filter from '../../../components/commons/Filter';
import FilterButtons from '../../../components/commons/Filter/FilterButtons';
import { PATH_QNAS } from '../../../constants/pathConstants';
import { useFilter } from '../../../hooks/useFilter';
import { useQnasStore } from '../../../store/qna/qnasStore';
import { createUrlParams } from '../../../utils/param';
import AnswerStatusContainer from './AnswerStatusContainer';
import DateContainer from './DateContainer';
import SearchContainer from './SearchContainer';
import StatusContainer from './StatusContainer';

const FilterContainer: React.FC = () => {
    const filters = useQnasStore();
    const { onClickReset, onClickSearch } = useFilter({
        setter: filters.update,
        path: PATH_QNAS,
        params: createUrlParams({
            page: filters.page,
            searchType: filters.searchType,
            searchTypeValue: filters.searchTypeValue,
            activate: filters.activate,
            startDate: filters.startDate,
            endDate: filters.endDate,
            limit: filters.limit,
            qnaStatus: filters.qnaStatus,
        }),
    });
    return (
        <Filter>
            <StatusContainer />
            <AnswerStatusContainer />
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
