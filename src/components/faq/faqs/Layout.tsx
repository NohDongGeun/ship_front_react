import React from 'react';
import { PATH_FAQS_ADD } from '../../../constants/pathConstants';
import PaginationContainer from '../../../containers/commons/PaginationContainer';
import FaqsContainer from '../../../containers/faq/faqs/FaqsContainer';
import FilterContainer from '../../../containers/faq/faqs/FilterContainer';
import { useGetFaqsCount } from '../../../hooks/useFaqs';
import ListView from '../../commons/ListView';

interface ILayout {
    queryString: string;
}

const Layout: React.FC<ILayout> = ({ queryString }) => {
    return (
        <ListView
            title={'FAQ 목록'}
            addHref={PATH_FAQS_ADD}
            addLabel={'FAQ 추가'}
        >
            <FilterContainer />
            <FaqsContainer queryString={queryString} />
            <PaginationContainer
                queryString={queryString}
                getCount={useGetFaqsCount}
            />
        </ListView>
    );
};

export default Layout;
