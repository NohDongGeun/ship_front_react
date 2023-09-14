import React from 'react';
import FaqContentContainer from '../../../containers/faq/add/FaqContentContainer';
import FaqServiceCategoryContainer from '../../../containers/faq/add/FaqServiceCategoryContainer';
import FaqStatusContainer from '../../../containers/faq/add/FaqStatusContainer';
import FaqTitleContainer from '../../../containers/faq/add/FaqTitleContainer';
import SubmitContainer from '../../../containers/faq/add/SubmitContainer';
import AddView from '../../commons/AddView';
import CollapseBox from '../../commons/CollapseBox';

const Layout: React.FC = () => {
    return (
        <AddView title={'FAQ 추가'} submitContainer={<SubmitContainer />}>
            <CollapseBox title={'FAQ 정보'}>
                <FaqTitleContainer />
                <FaqContentContainer />
                <FaqServiceCategoryContainer />
                <FaqStatusContainer />
            </CollapseBox>
        </AddView>
    );
};

export default Layout;
