import React from 'react';
import { PATH_SERVICE_CATEGORIES_ADD } from '../../../constants/pathConstants';
import PaginationContainer from '../../../containers/commons/PaginationContainer';
import FilterContainer from '../../../containers/serviceCategory/serviceCategories/FilterContainer';
import ServiceCatagoriesContainer from '../../../containers/serviceCategory/serviceCategories/ServiceCatagoriesContainer';
import { useGetServiceCategoriesCount } from '../../../hooks/useServiceCategories';
import ListView from '../../commons/ListView';

interface ILayout {
    queryString: string;
}

const Layout: React.FC<ILayout> = ({ queryString }) => {
    return (
        <ListView
            title={'서비스 카테고리 목록'}
            addHref={PATH_SERVICE_CATEGORIES_ADD}
            addLabel={'서비스 카테고리 추가'}
        >
            <FilterContainer />
            <ServiceCatagoriesContainer queryString={queryString} />
            <PaginationContainer
                queryString={queryString}
                getCount={useGetServiceCategoriesCount}
            />
        </ListView>
    );
};

export default Layout;
