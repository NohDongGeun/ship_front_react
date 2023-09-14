import React from 'react';
import CommunityContentContainer from '../../../containers/community/edit/CommunityContentContainer';
import CommunityCommentsContainer from '../../../containers/community/edit/CommunityCommentsContainer';
import CommunityTitleContainer from '../../../containers/community/edit/CommunityTitleContainer';
import AddView from '../../commons/AddView';
import CollapseBox from '../../commons/CollapseBox';
import CommunityStatusContainer from '../../../containers/community/edit/CommunityStatusContainer';
import CommunityAuthorUUIDContainer from '../../../containers/community/edit/CommunityAuthorUUIDContainer';
import CommunityActivateContainer from '../../../containers/community/edit/CommunityActivateContainer';
import CommunityCategoryContainer from '../../../containers/community/edit/CommunityCategoryContainer';
import SubmitContainer from '../../../containers/community/edit/SubmitContainer';
import DeleteContainer from '../../../containers/community/edit/DeleteContainer';

interface ILayout {
    communityId: string;
}

const Layout: React.FC<ILayout> = ({ communityId }) => {
    return (
        <AddView
            title={'커뮤니티 수정'}
            submitContainer={<SubmitContainer communityId={communityId} />}
            deleteContainer={<DeleteContainer communityId={communityId} />}
        >
            <CollapseBox title={'기본 정보'}>
                <CommunityAuthorUUIDContainer />
                <CommunityTitleContainer />
                <CommunityCategoryContainer />
                <CommunityStatusContainer />
                <CommunityActivateContainer />
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
