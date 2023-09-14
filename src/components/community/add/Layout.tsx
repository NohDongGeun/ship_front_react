import React from 'react';
import CommunityContentContainer from '../../../containers/community/add/CommunityContentContainer';
import CommunityCommentsContainer from '../../../containers/community/add/CommunityCommentsContainer';
import CommunityTitleContainer from '../../../containers/community/add/CommunityTitleContainer';
import AddView from '../../commons/AddView';
import CollapseBox from '../../commons/CollapseBox';
import CommunityActivateContainer from '../../../containers/community/add/CommunityActivateContainer';
import CommunityAuthorUUIDContainer from '../../../containers/community/add/CommunityAuthorUUIDContainer';
import CommunityStatusContainer from '../../../containers/community/add/CommunityStatusContainer';
import CommunityCategoryContainer from '../../../containers/community/add/CommunityCategoryContainer';
import SubmitContainer from '../../../containers/community/add/SubmitContainer';

const Layout: React.FC = () => {
    return (
        <AddView title={'커뮤니티 등록'} submitContainer={<SubmitContainer />}>
            <CollapseBox title={'기본 정보'}>
                <CommunityAuthorUUIDContainer />
                <CommunityTitleContainer />
                <CommunityActivateContainer />
                <CommunityCategoryContainer />
                <CommunityStatusContainer />
            </CollapseBox>
            <CollapseBox title={'글 정보'}>
                <CommunityContentContainer />
            </CollapseBox>
            <CollapseBox title={'댓글 정보'}>
                {/* <CommunityCommentsContainer /> */}
            </CollapseBox>
        </AddView>
    );
};

export default Layout;
