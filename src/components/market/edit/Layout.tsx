import React from 'react';
import DeleteContainer from '../../../containers/market/edit/DeleteContainer';
import MarketCategoriesContainer from '../../../containers/market/edit/MarketCategoriesContainer';
import MarketContentContainer from '../../../containers/market/edit/MarketContentContainer';
import MarketImageContainer from '../../../containers/market/edit/MarketImageContainer';
import MarketLocationContainer from '../../../containers/market/edit/MarketLocationContainer';
import MarketNameContainer from '../../../containers/market/edit/MarketNameContainer';
import MarketStatusContainer from '../../../containers/market/edit/MarketStatusContainer';
import MarketThumbnailContainer from '../../../containers/market/edit/MarketThumbnailContainer';
import SubmitContainer from '../../../containers/market/edit/SubmitContainer';
import AddView from '../../commons/AddView';
import CollapseBox from '../../commons/CollapseBox';

interface ILayout {
    marketId: string;
}

const Layout: React.FC<ILayout> = ({ marketId }) => {
    return (
        <AddView
            title={'시장 수정'}
            submitContainer={<SubmitContainer marketId={marketId} />}
            deleteContainer={<DeleteContainer marketId={marketId} />}
        >
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
