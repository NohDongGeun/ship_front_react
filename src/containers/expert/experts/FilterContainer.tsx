import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';
import Filter from '../../../components/commons/Filter';
import FilterButtons from '../../../components/commons/Filter/FilterButtons';
import { PATH_EXPERTS } from '../../../constants/pathConstants';
import { useExpertsStore } from '../../../store/expert/expertsStore';
import { createUrlParams } from '../../../utils/param';
import DateContainer from './DateContainer';
import SearchContainer from './SearchContainer';
import StatusContainer from './StatusContainer';

const FilterContainer: React.FC = () => {
    const router = useRouter();
    const experts = useExpertsStore();

    useEffect(() => {
        experts.update({
            ...router.query,
            startDate: router.query.startDate
                ? new Date(router.query.startDate as string)
                : null,
            endDate: router.query.endDate
                ? new Date(router.query.endDate as string)
                : null,
        });
    }, []);

    const onClickReset = useCallback(() => {
        window.location.href = PATH_EXPERTS;
    }, []);

    const onClickSearch = () => {
        const params = createUrlParams({
            page: experts.page,
            searchType: experts.searchType,
            searchTypeValue: experts.searchTypeValue,
            activate: experts.activate,
            startDate: experts.startDate,
            endDate: experts.endDate,
            limit: experts.limit,
        });
        router.push(`${PATH_EXPERTS}?${params}`);
    };
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
