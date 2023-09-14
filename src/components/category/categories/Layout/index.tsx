import React from 'react';
import { PATH_CATEGORY_ADD } from '../../../../constants/pathConstants';
import CategoriesContainer from '../../../../containers/category/categories/CategoriesContainer';
import FilterContainer from '../../../../containers/category/categories/FilterContainer';
import PaginationContainer from '../../../../containers/commons/PaginationContainer';
import { useGetCategoriesCount } from '../../../../hooks/useCategories';
import ListView from '../../../commons/ListView';

interface ILayout {
    queryString: string;
}

const Layout: React.FC<ILayout> = ({ queryString }) => {
    return (
        <ListView
            title={'카테고리 목록'}
            addHref={PATH_CATEGORY_ADD}
            addLabel={'카테고리 추가'}
        >
            <FilterContainer queryString={queryString} />
            <CategoriesContainer queryString={queryString} />
            <PaginationContainer
                queryString={queryString}
                getCount={useGetCategoriesCount}
            />
        </ListView>
    );
};

export default Layout;
