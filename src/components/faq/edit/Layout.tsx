import React from 'react';
import DeleteContainer from '../../../containers/faq/edit/deleteContainer';
import FaqContentContainer from '../../../containers/faq/edit/FaqContentContainer';
import FaqServiceCategoryContainer from '../../../containers/faq/edit/FaqServiceCategoryContainer';
import FaqStatusContainer from '../../../containers/faq/edit/FaqStatusContainer';
import FaqTitleContainer from '../../../containers/faq/edit/FaqTitleContainer';
import SubmitContainer from '../../../containers/faq/edit/SubmitContainer';
import AddView from '../../commons/AddView';
import CollapseBox from '../../commons/CollapseBox';

interface ILayout {
    faqId: string;
}

const Layout: React.FC<ILayout> = ({ faqId }) => {
    return (
        <AddView
            title={'FAQ 수정'}
            submitContainer={<SubmitContainer faqId={faqId} />}
            deleteContainer={<DeleteContainer faqId={faqId} />}
        >
            <CollapseBox title={'기본정보'}>
                <FaqTitleContainer />
                <FaqContentContainer />
                <FaqServiceCategoryContainer />
                <FaqStatusContainer />
            </CollapseBox>
        </AddView>
    );
};

export default Layout;
