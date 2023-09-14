import React from 'react';
import { PATH_EXPERTS_ADD } from '../../../constants/pathConstants';
import PaginationContainer from '../../../containers/commons/PaginationContainer';
import ExpertsContainer from '../../../containers/expert/experts/ExpertsContainer';
import FilterContainer from '../../../containers/expert/experts/FilterContainer';
import { useGetExpertsCount } from '../../../hooks/useExperts';
import ListView from '../../commons/ListView';

interface ILayout {
    queryString: string;
}

const Layout: React.FC<ILayout> = ({ queryString }) => {
    return (
        <ListView
            title={'전문가 목록'}
            addHref={PATH_EXPERTS_ADD}
            addLabel={'전문가 추가'}
        >
            <FilterContainer />
            <ExpertsContainer queryString={queryString} />
            <PaginationContainer
                queryString={queryString}
                getCount={useGetExpertsCount}
            />
        </ListView>
    );
};

export default Layout;
