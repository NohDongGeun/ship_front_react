import React from 'react';
import CommunityCategoryActivateContainer from '../../../containers/communityCategory/add/CommunityCategoryActivateContainer';
import CommunityCategoryNameContainer from '../../../containers/communityCategory/add/CommunityCategoryNameContainer';
import SubmitContainer from '../../../containers/communityCategory/add/SubmitContainer';
import AddView from '../../commons/AddView';
import CollapseBox from '../../commons/CollapseBox';

const Layout: React.FC = () => {
    return (
        <AddView
            title={'커뮤니티 카테고리 등록'}
            submitContainer={<SubmitContainer />}
        >
            <CollapseBox title={'기본 정보'}>
                <CommunityCategoryNameContainer />
                <CommunityCategoryActivateContainer />
            </CollapseBox>
        </AddView>
    );
};

export default Layout;
