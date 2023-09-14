import React from 'react';
import { PATH_COMMUNITY_CATEGORIES_ADD } from '../../../constants/pathConstants';
import PaginationContainer from '../../../containers/commons/PaginationContainer';
import CommunityCatagoriesContainer from '../../../containers/communityCategory/communityCategories/CommunityCatagoriesContainer';
import FilterContainer from '../../../containers/communityCategory/communityCategories/FilterContainer';
import { useGetCommunityCategoriesCount } from '../../../hooks/useCommunityCategories';
import ListView from '../../commons/ListView';

interface ILayout {
    queryString: string;
}

const Layout: React.FC<ILayout> = ({ queryString }) => {
    return (
        <ListView
            title={'커뮤니티 카테고리 목록'}
            addHref={PATH_COMMUNITY_CATEGORIES_ADD}
            addLabel={'커뮤니티 카테고리 추가'}
        >
            <FilterContainer />
            <CommunityCatagoriesContainer queryString={queryString} />
            <PaginationContainer
                queryString={queryString}
                getCount={useGetCommunityCategoriesCount}
            />
        </ListView>
    );
};

export default Layout;
