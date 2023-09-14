import React from 'react';
import { PATH_WHOLESALES_ADD } from '../../../constants/pathConstants';
import PaginationContainer from '../../../containers/commons/PaginationContainer';
import FilterContainer from '../../../containers/wholesale/wholesales/FilterContainer';
import WholesalesContainer from '../../../containers/wholesale/wholesales/WholesalesContainer';
import { useGetWholesalesCount } from '../../../hooks/useWholesales';
import ListView from '../../commons/ListView';

interface ILayout {
    queryString: string;
}

const Layout: React.FC<ILayout> = ({ queryString }) => {
    return (
        <ListView
            title={'도소매 목록'}
            addHref={PATH_WHOLESALES_ADD}
            addLabel={'도소매 추가'}
        >
            <FilterContainer />
            <WholesalesContainer queryString={queryString} />
            <PaginationContainer
                queryString={queryString}
                getCount={useGetWholesalesCount}
            />
        </ListView>
    );
};

export default Layout;
