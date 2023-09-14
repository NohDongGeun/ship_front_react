import React, { useCallback, useEffect } from 'react';
import Filter from '../../../components/commons/Filter';
import FilterButtons from '../../../components/commons/Filter/FilterButtons';
import { useCategoriesStore } from '../../../store/mainCategory/categoriesStore';
import DateContainer from './DateContainer';
import SearchContainer from './SearchContainer';
import StatusContainer from './StatusContainer';
import { useRouter } from 'next/router';
import { createUrlParams } from '../../../utils/param';
import { PATH_CATEGORIES } from '../../../constants/pathConstants';

interface IFilterContainer {
    queryString: string;
}

const FilterContainer: React.FC<IFilterContainer> = ({ queryString }) => {
    const router = useRouter();
    const categories = useCategoriesStore();

    useEffect(() => {
        categories.set({
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
        window.location.href = PATH_CATEGORIES;
    }, []);

    const onClickSearch = () => {
        const params = createUrlParams({
            page: categories.page,
            searchType: categories.searchType,
            searchTypeValue: categories.searchTypeValue,
            activate: categories.activate,
            startDate: categories.startDate,
            endDate: categories.endDate,
            limit: categories.limit,
        });
        router.push(`${PATH_CATEGORIES}?${params}`);
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
