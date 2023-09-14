import React from 'react';
import BannerImageContainer from '../../../containers/banner/add/BannerImageContainer';
import BannerLinkContainer from '../../../containers/banner/add/BannerLinkContainer';
import BannerStatusContainer from '../../../containers/banner/add/BannerStatusContainer';
import SubmitContainer from '../../../containers/banner/add/SubmitContainer';
import AddView from '../../commons/AddView';
import CollapseBox from '../../commons/CollapseBox';

const Layout: React.FC = () => {
    return (
        <AddView title={'배너 추가'} submitContainer={<SubmitContainer />}>
            <CollapseBox title={'배너 정보'}>
                <BannerLinkContainer />
                <BannerImageContainer />
                <BannerStatusContainer />
            </CollapseBox>
        </AddView>
    );
};

export default Layout;
