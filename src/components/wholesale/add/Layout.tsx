import React from 'react';
import SubmitContainer from '../../../containers/wholesale/add/SubmitContainer';
import WholesaleCategoriesContainer from '../../../containers/wholesale/add/WholesaleCategoriesContainer';
import WholesaleContentContainer from '../../../containers/wholesale/add/WholesaleContentContainer';
import WholesaleMarketContainer from '../../../containers/wholesale/add/WholesaleMarketContainer';
import WholesaleStatusContainer from '../../../containers/wholesale/add/WholesaleStatusContainer';
import WholesaleUserCareerContainer from '../../../containers/wholesale/add/WholesaleUserCareerContainer';
import WholesaleStoreNameContainer from '../../../containers/wholesale/add/WholesaleStoreNameContainer';
import WholesaleUserProfileContainer from '../../../containers/wholesale/add/WholesaleUserProfileContainer';
import AddView from '../../commons/AddView';
import CollapseBox from '../../commons/CollapseBox';
import WholesaleBusinessNumberContainer from '../../../containers/wholesale/add/WholesaleBusinessNumberContainer';
import WholesaleAddressContainer from '../../../containers/wholesale/add/WholesaleAddressContainer';
import WholesaleImagesContainer from '../../../containers/wholesale/add/WholesaleImagesContainer';
import WholesaleThumbnailContainer from '../../../containers/wholesale/add/WholesaleThumbnailContainer';
import { Divider } from '@mui/material';
import WholesaleNameContainer from '../../../containers/wholesale/add/WholesaleNameContainer';
import WholesaleUserUUIDContainer from '../../../containers/wholesale/add/WholesaleUserUUIDContainer';

const Layout: React.FC = () => {
    return (
        <AddView title={'도소매 추가'} submitContainer={<SubmitContainer />}>
            <CollapseBox title={'기본 정보'}>
                <WholesaleUserUUIDContainer />
                <WholesaleNameContainer />
                <WholesaleStoreNameContainer />
                <WholesaleMarketContainer />
                <WholesaleAddressContainer />
                <WholesaleBusinessNumberContainer />
                <WholesaleUserCareerContainer />
                <WholesaleUserProfileContainer />
                <WholesaleStatusContainer />
            </CollapseBox>
            <CollapseBox title={'도소매 이미지'}>
                <WholesaleThumbnailContainer />
                <WholesaleImagesContainer />
            </CollapseBox>
            <CollapseBox title={'도소매 소개글'}>
                <WholesaleContentContainer />
            </CollapseBox>
            <CollapseBox title={'카테고리 정보'}>
                <WholesaleCategoriesContainer />
            </CollapseBox>
        </AddView>
    );
};

export default Layout;
