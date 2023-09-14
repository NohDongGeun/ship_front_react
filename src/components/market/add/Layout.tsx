import React from 'react';
import MarketCategoriesContainer from '../../../containers/market/add/MarketCategoriesContainer';
import MarketContentContainer from '../../../containers/market/add/MarketContentContainer';
import MarketHashtagContainer from '../../../containers/market/add/MarketHashtagContainer';
import MarketImageContainer from '../../../containers/market/add/MarketImageContainer';
import MarketLocationContainer from '../../../containers/market/add/MarketLocationContainer';
import MarketNameContainer from '../../../containers/market/add/MarketNameContainer';
import MarketStatusContainer from '../../../containers/market/add/MarketStatusContainer';
import MarketThumbnailContainer from '../../../containers/market/add/MarketThumbnailContainer';
import SubmitContainer from '../../../containers/market/add/SubmitContainer';
import AddView from '../../commons/AddView';
import CollapseBox from '../../commons/CollapseBox';

interface ILayout {}

const Layout: React.FC<ILayout> = ({}) => {
    return (
        <AddView title={'시장 등록'} submitContainer={<SubmitContainer />}>
            <CollapseBox title={'시장 정보'}>
                <MarketNameContainer />
                <MarketLocationContainer />
                <MarketStatusContainer />
            </CollapseBox>
            <CollapseBox title={'시장 카테고리'}>
                <MarketCategoriesContainer />
            </CollapseBox>
            <CollapseBox title={'시장 이미지'}>
                <MarketThumbnailContainer />
                <MarketImageContainer />
            </CollapseBox>
            <CollapseBox title={'시장 설명'}>
                <MarketContentContainer />
            </CollapseBox>
        </AddView>
    );
};

export default Layout;
