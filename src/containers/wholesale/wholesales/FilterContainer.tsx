import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';
import Filter from '../../../components/commons/Filter';
import FilterButtons from '../../../components/commons/Filter/FilterButtons';
import { PATH_WHOLESALES } from '../../../constants/pathConstants';
import { useWholesalesStore } from '../../../store/wholesale/useWholesalesStore';
import { createUrlParams } from '../../../utils/param';
import DateContainer from './DateContainer';
import SearchContainer from './SearchContainer';
import StatusContainer from './StatusContainer';

const FilterContainer: React.FC = () => {
    const router = useRouter();
    const wholesales = useWholesalesStore();

    useEffect(() => {
        wholesales.update({
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
        window.location.href = PATH_WHOLESALES;
    }, []);

    const onClickSearch = () => {
        const params = createUrlParams({
            page: wholesales.page,
            searchType: wholesales.searchType,
            searchTypeValue: wholesales.searchTypeValue,
            activate: wholesales.activate,
            startDate: wholesales.startDate,
            endDate: wholesales.endDate,
            limit: wholesales.limit,
        });
        router.push(`${PATH_WHOLESALES}?${params}`);
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
