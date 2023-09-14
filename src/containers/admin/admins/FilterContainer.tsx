import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';
import Filter from '../../../components/commons/Filter';
import FilterButtons from '../../../components/commons/Filter/FilterButtons';
import { PATH_ADMINS, PATH_USERS } from '../../../constants/pathConstants';
import { useAdminsStore } from '../../../store/admin/adminsStore';
import { createUrlParams } from '../../../utils/param';
import DateContainer from './DateContainer';
import SearchContainer from './SearchContainer';
import StatusContainer from './StatusContainer';

const FilterContainer: React.FC = () => {
    const router = useRouter();
    const filter = useAdminsStore();

    useEffect(() => {
        filter.update({
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
        window.location.href = PATH_USERS;
    }, []);

    const onClickSearch = () => {
        const params = createUrlParams({
            page: filter.page,
            searchType: filter.searchType,
            searchTypeValue: filter.searchTypeValue,
            activate: filter.activate,
            startDate: filter.startDate,
            endDate: filter.endDate,
            limit: filter.limit,
        });
        router.push(`${PATH_ADMINS}?${params}`);
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
