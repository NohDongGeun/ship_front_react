import React from 'react';
import { PATH_BANNERS_ADD } from '../../../../constants/pathConstants';
import BannersContainer from '../../../../containers/banner/banners/BannersContainer';
import FilterContainer from '../../../../containers/banner/banners/FilterContainer';
import PaginationContainer from '../../../../containers/commons/PaginationContainer';
import { useGetBannersCount } from '../../../../hooks/useBanners';
import ListView from '../../../commons/ListView';

interface ILayout {
    queryString: string;
}

const Layout: React.FC<ILayout> = ({ queryString }) => {
    return (
        <ListView
            title={'배너 목록'}
            addHref={PATH_BANNERS_ADD}
            addLabel={'배너 추가'}
        >
            <FilterContainer />
            <BannersContainer queryString={queryString} />
            <PaginationContainer
                queryString={queryString}
                getCount={useGetBannersCount}
            />
        </ListView>
    );
};

export default Layout;
