import React from 'react';
import ExpertActivateContainer from '../../../containers/expert/add/ExpertActivateContainer';
import ExpertAddressContainer from '../../../containers/expert/add/ExpertAddressContainer';
import ExpertBusinessNumberContainer from '../../../containers/expert/add/ExpertBusinessNumberContainer';
import ExpertCareerContainer from '../../../containers/expert/add/ExpertCareerContainer';
import ExpertCategoriesContainer from '../../../containers/expert/add/ExpertCategoriesContainer';
import ExpertContentContainer from '../../../containers/expert/add/ExpertContentContainer';
import ExpertImagesContainer from '../../../containers/expert/add/ExpertImagesContainer';
import ExpertMarketContainer from '../../../containers/expert/add/ExpertMarketContainer';
import ExpertNameContainer from '../../../containers/expert/add/ExpertNameContainer';
import ExpertThumbnailContainer from '../../../containers/expert/add/ExpertThumbnailContainer';
import ExpertUserUUIDContainer from '../../../containers/expert/add/ExpertUserUUIDContainer';
import SubmitContainer from '../../../containers/expert/add/SubmitContainer';
import AddView from '../../commons/AddView';
import CollapseBox from '../../commons/CollapseBox';

const Layout: React.FC = () => {
    return (
        <AddView title={'전문가 추가'} submitContainer={<SubmitContainer />}>
            <CollapseBox title={'기본 정보'}>
                <ExpertUserUUIDContainer />
                <ExpertNameContainer />
                <ExpertMarketContainer />
                <ExpertAddressContainer />
                <ExpertBusinessNumberContainer />
                <ExpertCareerContainer />
                <ExpertActivateContainer />
            </CollapseBox>
            <CollapseBox title={'도소매 이미지'}>
                <ExpertThumbnailContainer />
                <ExpertImagesContainer />
            </CollapseBox>
            <CollapseBox title={'도소매 소개글'}>
                <ExpertContentContainer />
            </CollapseBox>
            <CollapseBox title={'카테고리 정보'}>
                <ExpertCategoriesContainer />
            </CollapseBox>
        </AddView>
    );
};

export default Layout;
