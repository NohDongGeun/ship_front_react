import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';
import Filter from '../../../components/commons/Filter';
import FilterButtons from '../../../components/commons/Filter/FilterButtons';
import { PATH_USERS } from '../../../constants/pathConstants';
import { useUsersStore } from '../../../store/user/usersStore';
import { createUrlParams } from '../../../utils/param';
import DateContainer from './DateContainer';
import SearchContainer from './SearchContainer';
import StatusContainer from './StatusContainer';

const FilterContainer: React.FC = () => {
    const router = useRouter();
    const users = useUsersStore();

    useEffect(() => {
        users.update({
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
            page: users.page,
            searchType: users.searchType,
            searchTypeValue: users.searchTypeValue,
            activate: users.activate,
            startDate: users.startDate,
            endDate: users.endDate,
            limit: users.limit,
        });
        router.push(`${PATH_USERS}?${params}`);
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
