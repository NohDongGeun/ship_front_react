import React from 'react';
import SubmitContainer from '../../../containers/wholesale/edit/SubmitContainer';
import WholesaleAddressContainer from '../../../containers/wholesale/edit/WholesaleAddressContainer';
import WholesaleBusinessNumberContainer from '../../../containers/wholesale/edit/WholesaleBusinessNumberContainer';
import WholesaleCategoriesContainer from '../../../containers/wholesale/edit/WholesaleCategoriesContainer';
import WholesaleContentContainer from '../../../containers/wholesale/edit/WholesaleContentContainer';
import WholesaleImagesContainer from '../../../containers/wholesale/edit/WholesaleImagesContainer';
import WholesaleMarketContainer from '../../../containers/wholesale/edit/WholesaleMarketContainer';
import WholesaleStatusContainer from '../../../containers/wholesale/edit/WholesaleStatusContainer';
import WholesaleStoreNameContainer from '../../../containers/wholesale/edit/WholesaleStoreNameContainer';
import WholesaleThumbnailContainer from '../../../containers/wholesale/edit/WholesaleThumbnailContainer';
import WholesaleUserCareerContainer from '../../../containers/wholesale/edit/WholesaleUserCareerContainer';
import WholesaleUserEmailContainer from '../../../containers/wholesale/edit/WholesaleUserEmailContainer';
import WholesaleUserProfileContainer from '../../../containers/wholesale/edit/WholesaleUserProfileContainer';
import AddView from '../../commons/AddView';
import CollapseBox from '../../commons/CollapseBox';
import DeleteContainer from '../../../containers/wholesale/edit/DeleteContainer';

interface ILayout {
    userId: string;
    wholesaleId: string;
}

const Layout: React.FC<ILayout> = ({ wholesaleId, userId }) => {
    return (
        <AddView
            title={'도소매 수정'}
            submitContainer={
                <SubmitContainer userId={userId} wholesaleId={wholesaleId} />
            }
            deleteContainer={
                <DeleteContainer userId={userId} wholesaleId={wholesaleId} />
            }
        >
            <CollapseBox title={'기본 정보'}>
                <WholesaleUserEmailContainer />
                <WholesaleStoreNameContainer />
                <WholesaleBusinessNumberContainer />
                <WholesaleMarketContainer />
                <WholesaleAddressContainer />
                <WholesaleUserCareerContainer />
                <WholesaleUserProfileContainer />
                <WholesaleStatusContainer />
            </CollapseBox>
            <CollapseBox title={'도소매 소개글'}>
                <WholesaleContentContainer />
            </CollapseBox>
            <CollapseBox title={'카테고리 정보'}>
                <WholesaleCategoriesContainer />
            </CollapseBox>
            <CollapseBox title={'이미지 정보'}>
                <WholesaleThumbnailContainer />
                <WholesaleImagesContainer />
            </CollapseBox>
        </AddView>
    );
};

export default Layout;
