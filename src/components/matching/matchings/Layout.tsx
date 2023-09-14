import React from 'react';
import { PATH_MATCHINGS_ADD } from '../../../constants/pathConstants';
import PaginationContainer from '../../../containers/commons/PaginationContainer';
import FilterContainer from '../../../containers/matching/matchings/FilterContainer';
import MatchingsContainer from '../../../containers/matching/matchings/MatchingsContainer';
import { useGetMatchingsCount } from '../../../hooks/useMatchings';
import ListView from '../../commons/ListView';

interface ILayout {
    queryString: string;
}

const Layout: React.FC<ILayout> = ({ queryString }) => {
    return (
        <ListView
            addHref={PATH_MATCHINGS_ADD}
            addLabel={'매칭 추가'}
            title={'매칭 목록'}
        >
            <FilterContainer />
            <MatchingsContainer queryString={queryString} />
            <PaginationContainer
                queryString={queryString}
                getCount={useGetMatchingsCount}
            />
        </ListView>
    );
};

export default Layout;
