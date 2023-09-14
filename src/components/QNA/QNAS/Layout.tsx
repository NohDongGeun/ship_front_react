import React from 'react';
import { PATH_QNAS_ADD } from '../../../constants/pathConstants';
import PaginationContainer from '../../../containers/commons/PaginationContainer';
import FilterContainer from '../../../containers/qna/qnas/FilterContainer';
import QnasContainer from '../../../containers/qna/qnas/QnasContainer';
import { useGetQnasCount } from '../../../hooks/useQnas';
import ListView from '../../commons/ListView';

interface ILayout {
    queryString: string;
}

const Layout: React.FC<ILayout> = ({ queryString }) => {
    return (
        <ListView
            title={'QNA 목록'}
            addHref={PATH_QNAS_ADD}
            addLabel={'QNA 추가'}
        >
            <FilterContainer />
            <QnasContainer queryString={queryString} />
            <PaginationContainer
                queryString={queryString}
                getCount={useGetQnasCount}
            />
        </ListView>
    );
};

export default Layout;
