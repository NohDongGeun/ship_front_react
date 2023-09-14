import React from 'react';
import { PATH_COMMUNITIES_ADD } from '../../../constants/pathConstants';
import PaginationContainer from '../../../containers/commons/PaginationContainer';
import CommunitiesContainer from '../../../containers/community/communities/CommunitiesContainer';
import FilterContainer from '../../../containers/community/communities/FilterContainer';
import { useGetCommunitiesCount } from '../../../hooks/useCommunities';
import ListView from '../../commons/ListView';

interface ILayout {
    queryString: string;
}

const Layout: React.FC<ILayout> = ({ queryString }) => {
    return (
        <ListView
            title={'커뮤니티 목록'}
            addHref={PATH_COMMUNITIES_ADD}
            addLabel={'커뮤니티 추가'}
        >
            <FilterContainer />
            <CommunitiesContainer queryString={queryString} />
            <PaginationContainer
                queryString={queryString}
                getCount={useGetCommunitiesCount}
            />
        </ListView>
    );
};

export default Layout;
