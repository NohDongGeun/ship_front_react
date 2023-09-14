import React from 'react';
import { PATH_MARKETS_ADD } from '../../../constants/pathConstants';
import PaginationContainer from '../../../containers/commons/PaginationContainer';
import FilterContainer from '../../../containers/market/markets/FilterContainer';
import MarketsContainer from '../../../containers/market/markets/MarketsContainer';
import { useGetMarketsCount } from '../../../hooks/useMarkets';
import ListView from '../../commons/ListView';

interface ILayout {
    queryString: string;
}

const Layout: React.FC<ILayout> = ({ queryString }) => {
    return (
        <ListView
            title={'시장 목록'}
            addHref={PATH_MARKETS_ADD}
            addLabel={'시장 추가'}
        >
            <FilterContainer />
            <MarketsContainer queryString={queryString} />
            <PaginationContainer
                queryString={queryString}
                getCount={useGetMarketsCount}
            />
        </ListView>
    );
};

export default Layout;
